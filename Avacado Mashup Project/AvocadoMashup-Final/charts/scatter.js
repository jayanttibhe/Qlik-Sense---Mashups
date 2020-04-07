function createScatter(app) {
  return new Promise(resolve => {
    app
      .createCube({
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
              qDef: "=sum({<Type={'conventional'}>}[Total Volume])",
              qFieldLabels: "Total Volume - Conventional"
            }
          },
          {
            qDef: {
              qDef: "=sum({<Type={'organic'}>}[Total Volume])",
              qFieldLabels: "Total Volume - Organic"
            }
          }
        ],
        qSuppressZero: false,
        qSuppressMissing: false
      })
      .then(reply => {
        console.log("scatter ", reply.layout);

        let data = reply.layout.qHyperCube;
        picasso.use(picassoQ); // register
        
        models.push(reply.layout)
        
        const scatter = picasso.chart({
          element: document.querySelector("#QV01"),
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
                data: {
                  field: "=sum({<Type={'conventional'}>}[Total Volume])"
                },
                invert: true,
                expand: 0.3
              },
              x: {
                data: {
                  field: "=sum({<Type={'organic'}>}[Total Volume])"
                },
                expand: 0.3
              },
              col: {
                data: { extract: { field: "Region" } },
                type: "color"
              }
            },
            interactions: [
              {
                type: "native",
                events: {
                  click(e) {
                    switch (e.toElement.attributes[1].nodeValue) {
                      case "next":
                        this.chart.component("legendKey").emit("next");
                        break;
                      case "prev":
                        this.chart.component("legendKey").emit("prev");
                        break;
                      default:
                        break;
                    }
                  }
                }
              },
              {
                type: "native",
                events: {
                  mousemove(e) {
                    this.chart.component("tooltipKey").emit("show", e);
                  },
                  mouseleave() {
                    this.chart.component("tooltipKey").emit("hide");
                  }
                }
              },
              {
                type: "native",
                events: {
                  mousedown: function(e) {
                    if (e.altKey) {
                      this.chart.brush("lasso-example").end();
                    }
                    this.chart.component("lasso").emit("lassoStart", {
                      center: { x: e.clientX, y: e.clientY }
                    });
                  },
                  mousemove: function(e) {
                    this.chart.component("lasso").emit("lassoMove", {
                      center: { x: e.clientX, y: e.clientY }
                    });
                  },
                  mouseup: function(e) {
                    this.chart.component("lasso").emit("lassoEnd", {
                      center: { x: e.clientX, y: e.clientY }
                    });

                    const b = this.chart.brush("lasso-example");
                    selectedDim = data.qDimensionInfo[0].qFallbackTitle;
                    selection = picassoQ.selections(b)[0];
                  }
                }
              }
            ],
            components: [
              {
                key: "legendKey",
                type: "legend-cat",
                scale: "col",
                dock: "right",
                brush: {
                  trigger: [
                    {
                      contexts: ["lasso-example"],
                      on: "tap",
                      action: "toggle"
                    }
                  ],
                  consume: [
                    {
                      context: "lasso-example",
                      style: {
                        inactive: {
                          opacity: 0.4
                        },
                        active: {
                          opacity: 1
                        }
                      }
                    }
                  ]
                }
              },
              {
                type: "axis",
                scale: "y",
                dock: "left"
              },
              {
                type: "axis",
                scale: "x",
                dock: "bottom"
              },
              {
                type: "point",
                data: {
                  extract: {
                    field: "Region",
                    props: {
                      y: {
                        field: "=sum({<Type={'conventional'}>}[Total Volume])"
                      },
                      x: { field: "=sum({<Type={'organic'}>}[Total Volume])" },
                      fill: { field: "Region" },
                      brush: { field: "Region" },
                      region: { field: "Region" }
                    }
                  }
                },
                settings: {
                  x: { scale: "x" },
                  y: { scale: "y" },
                  opacity: 0.8,
                  fill: { scale: "col" }
                },
                key: "p",
                brush: {
                  trigger: [
                    {
                      contexts: ["lasso-example"],
                      data: ["brush"]
                    }
                  ],
                  consume: [
                    {
                      context: "lasso-example",
                      style: {
                        inactive: {
                          opacity: 0.4
                        },
                        active: {
                          opacity: 1,
                          stroke: "#333",
                          strokeWidth: 2
                        }
                      }
                    }
                  ]
                }
              },
              {
                key: "lasso",
                type: "brush-lasso",
                settings: {
                  brush: {
                    components: [
                      {
                        key: "p",
                        contexts: ["lasso-example"],
                        data: ["brush"]
                      }
                    ]
                  }
                }
              },
              {
                key: "tooltipKey",
                type: "tooltip",
                settings: {
                  extract: ({ node }) => ({
                    region: node.data.region.label
                  }),
                  content: ({ h, data }) => {
                    rows = [];
                    data.map(datum =>
                      rows.push(h("div", {}, "Region: " + datum.region))
                    );
                    return h("div", {}, rows);
                  }
                }
              },
              {
                type: "text",
                text: "Total Avocado Volume by Region",
                layout: {
                  dock: "top"
                }
              },
              {
                type: "text",
                text: "Total Volume - Conventional",
                layout: {
                  dock: "left"
                }
              },
              {
                type: "text",
                text: "Total Volume - Organic",
                layout: {
                  dock: "bottom"
                }
              }
            ]
          }
        });
        resolve(scatter);
      });
  });
}
