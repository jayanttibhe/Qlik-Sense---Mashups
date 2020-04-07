function createLine(app) {
  
  function mouseEventToRangeEvent(e) {
      return {
        center: { x: e.clientX, y: e.clientY },
        deltaX: e.movementX,
        deltaY: e.movementY
      };
    }

  return new Promise(resolve => {
    app.createCube(
        {
          qInitialDataFetch: [
            {
              qHeight: 2000, //"Region" "Total Volume"  "Average Price"
              qWidth: 3
            }
          ],
          qDimensions: [
            {
              qDef: {
                qFieldDefs: ["Date"],
                qFieldLabels: ["Date"]
              }
            }
          ],
          qMeasures: [
            {
              qDef: {
                qDef: "=sum([Total Volume])",
                qFieldLabels: "Total Volume"
              }
            },
            {
              qDef: {
                qDef: "=sum([Average Price])",
                qFieldLabels: "Average Price"
              }
            }
          ],
          qSuppressZero: false,
          qSuppressMissing: false,
          qMode: "S",
          qInterColumnSortOrder: [],
          qStateName: "$"
        }).then(reply => {
        let data = reply.layout.qHyperCube;
        console.log("line data: ", data);

        //push hypercube to models array
        models.push(reply.layout)

        //initialise Q
        picasso.use(picassoQ);

        const line = picasso.chart({
          element: document.querySelector("#QV02"),
          data: [
            {
              type: "q",
              key: "qHyperCube",
              data: data
            }
          ],
          settings: {
            scales: {
              y: {
                data: { field: "=sum([Total Volume])" },
                invert: true,
                include: [0]
              },
              z: {
                data: { field: "=sum([Average Price])" },
                invert: true
              },
              c: {
                data: { field: "=sum([Total Volume])" },
                type: "color"
              },
              t: { data: { extract: { field: "Date" } }, padding: 0.3 }
            },
            interactions: [
              {
                type: "native",
                events: {
                  mousedown: function(e) {
                    if (e.altKey) {
                      this.chart.brush("range").end();
                      this.chart.component("rangeX").emit("rangeClear");
                    }
                    this.chart
                      .component("rangeX")
                      .emit("rangeStart", mouseEventToRangeEvent(e));
                  },
                  mousemove: function(e) {
                    this.chart
                      .component("rangeX")
                      .emit("rangeMove", mouseEventToRangeEvent(e));
                  },
                  mouseup: function(e) {
                    this.chart
                      .component("rangeX")
                      .emit("rangeEnd", mouseEventToRangeEvent(e));

                    const b = this.chart.brush("range");
                    selectedDim = data.qDimensionInfo[0].qFallbackTitle
                    selection = picassoQ.selections(b)[0];
                  }
                }
              }
            ],
            components: [
              {
                key: "y-axis",
                type: "axis",
                dock: "left",
                scale: "y"
              },
              {
                key: "x-axis",
                type: "axis",
                dock: "bottom",
                scale: "t",
                settings: {
                  labels: {
                    mode: "tilted",
                    tiltAngle: 90,
                    filterOverlapping: true,
                    align: 0.2
                  }
                },
                brush: {
                  trigger: [
                    {
                      contexts: ["range"],
                      data: ["sel"]
                    }
                  ],
                  consume: [
                    {
                      context: ["range"],
                      style: {
                        inactive: {
                          opacity: 0.4
                        }
                      }
                    }
                  ]
                }
              },
              {
                type: "axis",
                dock: "right",
                scale: "z",
                formatter: {
                  type: "d3-number",
                  format: "$,.1r"
                }
              },
              {
                key: "lines",
                type: "line",
                data: {
                  extract: {
                    field: "Date",
                    props: {
                      v: { field: "=sum([Total Volume])" }
                    }
                  }
                },
                settings: {
                  coordinates: {
                    major: { scale: "t" },
                    minor: { scale: "y", ref: "v" }
                  },
                  layers: {
                    curve: "monotone",
                    show: true,
                    line: {
                      strokeWidth: 2,
                    }
                  }
                }
              },
              {
                key: "lines",
                type: "line",
                data: {
                  extract: {
                    field: "Date",
                    props: {
                      v: { field: "=sum([Average Price])" }
                    }
                  }
                },
                settings: {
                  coordinates: {
                    major: { scale: "t" },
                    minor: { scale: "z", ref: "v" }
                  },
                  layers: {
                    curve: "monotone",
                    show: true,
                    line: {
                      strokeWidth: 2,
                      stroke: "#ff6961" //'#ff6961',
                    }
                  }
                }
              },
              {
                type: "text",
                text: "X Axis",
                layout: {
                  dock: "bottom"
                }
              },
              {
                type: "text",
                text: "Total Volume",
                layout: {
                  dock: "left"
                }
              },
              {
                type: "text",
                text: "Average Price",
                style: {
                  text: {
                    fill: "#ff6961"
                  }
                },
                layout: {
                  dock: "right"
                }
              },
              {
                type: "text",
                text: "Avocado Volume and Price",
                layout: {
                  dock: "top"
                }
              },
              {
                key: "rangeX",
                type: "brush-range",
                settings: {
                  brush: "range",
                  direction: "horizontal",
                  scale: "t",
                  target: {
                    component: "x-axis"
                  },
                  bubbles: {
                    align: "start"
                  }
                }
              }
            ]
          }
        });
        resolve(line);
      });
  });
}