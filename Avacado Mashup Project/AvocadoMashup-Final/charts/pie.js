function createPie(app) {
  return new Promise(resolve => {
    app.createCube({
        qInitialDataFetch: [
          {
            qHeight: 2000,
            qWidth: 4
          }
        ],
        qDimensions: [
          {
            qDef: {
              qFieldDefs: ["Region"]
            },
            qNullSuppression: true,
            qOtherTotalSpec: {
              qOtherMode: "OTHER_COUNTED",
              qSuppressOther: true,
              qOtherSortMode: "OTHER_SORT_DESCENDING",
              qOtherCounted: {
                qv: "5"
              },
              qOtherLimitMode: "OTHER_GE_LIMIT"
            }
          }
        ],
        qMeasures: [
          {
            qDef: {
              qDef: "=sum([Total Volume])",
              qFieldLabels: "Total Volume"
            }
          }
        ],
        qSuppressZero: false,
        qSuppressMissing: false,
        qMode: "S",
        qInterColumnSortOrder: [],
        qStateName: "$"
      })
      .then(reply => {
        let data = reply.layout.qHyperCube;
        console.log("pie data: ", data);

        //push hypercube to models array
        models.push(reply.layout);

        //initialise Q
        picasso.use(picassoQ);

        const pie = picasso.chart({
          element: document.querySelector("#QV03"),
          data: [
            {
              type: "q",
              key: "qHyperCube",
              data: data
            }
          ],
          settings: {
            scales: {
              c: {
                data: { extract: { field: "Region" } },
                type: "color"
              }
            },
            interactions: [
              {
                type: "native",
                events: {
                  mousedown: function(e) {
                    if (e.altKey) {
                      this.chart.brush("highlight").end();
                    }
                  },
                  mouseup: function(e) {
                    const b = this.chart.brush("highlight");
                    selectedDim = data.qDimensionInfo[0].qFallbackTitle;
                    selection = picassoQ.selections(b)[0];
                  }
                }
              }
            ],
            components: [
              {
                type: "legend-cat",
                scale: "c",
                dock: "right"
              },
              {
                key: "p",
                type: "pie",
                data: {
                  extract: {
                    field: "Region",
                    props: {
                      num: { field: "=sum([Total Volume])" },
                      fill: { field: "Region" }
                    }
                  }
                },
                settings: {
                  slice: {
                    arc: { ref: "num" },
                    fill: { scale: "c" },
                    outerRadius: () => 0.9,
                    strokeWidth: 1,
                    stroke: "rgba(255, 255, 255, 0.5)"
                  }
                },
                brush: {
                  trigger: [
                    {
                      contexts: ["highlight"],
                      on: "tap",
                      action: "toggle",
                      data: ["fill"]
                    }
                  ],
                  consume: [
                    {
                      context: "highlight",
                      style: {
                        active: {
                          opacity: 1,
                          stroke: "#333",
                          strokeWidth: 2
                        },
                        inactive: {
                          opacity: 0.4
                        }
                      }
                    }
                  ]
                }
              },
              {
                type: "text",
                text: "Top 5 States by Volume",
                layout: {
                  dock: "top"
                }
              }
            ]
          }
        });
        resolve(pie);
      });
  });
}
