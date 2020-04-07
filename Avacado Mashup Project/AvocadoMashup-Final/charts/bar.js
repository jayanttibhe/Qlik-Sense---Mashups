function createBar(app) {
  function mouseEventToRangeEvent(e) {
    return {
      center: { x: e.clientX, y: e.clientY },
      deltaX: e.movementX,
      deltaY: e.movementY
    };
  }

  return new Promise(resolve => {
  app.createCube({
      qInitialDataFetch: [
        {
          qHeight: 2000,
          qWidth: 3
        }
      ],
      qDimensions: [
        {
          qDef: {
            qFieldDefs: ["Region"],
            qFieldLabels: ["Region"]
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
            qDef: "=avg([Average Price])",
            qFieldLabels: "Average Price"
          }
        }
      ],
      qSuppressZero: false,
      qSuppressMissing: false
    })
    .then(reply => {
      console.log("bar ", reply.layout);

      let data = reply.layout.qHyperCube;
      picasso.use(picassoQ); // register

      models.push(reply.layout)

      const bar = picasso.chart({
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
            c: {
              data: { field: "=sum([Total Volume])" },
              type: "color"
            },
            t: { data: { extract: { field: "Region" } }, padding: 0.3 },
            z: {
              data: { field: "=avg([Average Price])" },
              invert: true,
              include: [0]
            }
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
                  selectedDim = data.qDimensionInfo[0].qFallbackTitle;
                  selection = picassoQ.selections(b)[0];
                }
              }
            }
          ],
          components: [
            {
              type: "axis",
              dock: "left",
              scale: "y"
            },
            {
              type: "axis",
              dock: "bottom",
              scale: "t",
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
              scale: "z"
            },
            {
              key: "bars",
              type: "box",
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
                      active: {
                        stroke: "#333",
                        strokeWidth: 2,
                        opacity: 1
                      },
                      inactive: {
                        opacity: 0.4,
                        strokeWidth: 0
                      }
                    }
                  }
                ]
              },
              data: {
                extract: {
                  field: "Region",
                  props: {
                    start: 0,
                    end: { field: "=sum([Total Volume])" },
                    sel: { field: "Region" }
                  }
                }
              },
              settings: {
                major: { scale: "t" },
                minor: { scale: "y" },
                box: {
                  fill: { scale: "c", ref: "end" }
                }
              }
            },
            {
              key: "line",
              type: "line",
              data: {
                extract: {
                  field: "Region",
                  props: {
                    v: { field: "=avg([Average Price])" }
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
                    stroke: "#ff6961"
                  }
                }
              }
            },
            {
              type: "text",
              text: "Region",
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
              text: "Total Sales & Average Price by Region",
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
                }
              }
            }
          ]
        }
      });
      resolve(bar)
    });
  })
}
