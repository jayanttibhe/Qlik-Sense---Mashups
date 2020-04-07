import picasso from "picasso.js";
import picassoQ from "picasso-plugin-q";

class lineChart {
    constructor(data){
        this.data = data
    }

    init(color) {
        this.data.object.getLayout().then(layout => {
            this.layout = layout
            this.update(color)
        })
    }

    update(color){
        this.data.object.getLayout().then(layout => {
            let data = layout.qHyperCube
            let dim = layout.qHyperCube.qDimensionInfo[1].qFallbackTitle
            
            let title = "";
            if (dim == "main_category") {
              title = "Category"
              $('#chart-category').css({'text-decoration':'underline', 'font-weight': 'bold' })
              $('#chart-year').css({'text-decoration':'none', 'font-weight': 'normal' })
            } else {
              title = "Year Launched"
              $('#chart-year').css({'text-decoration':'underline', 'font-weight': 'bold' })
              $('#chart-category').css({'text-decoration':'none', 'font-weight': 'normal' })
            } 

            picasso.use(picassoQ)

            picasso.chart({
                element: document.querySelector("#chart-wrapper"),
                data: [
                  {
                    type: "q",
                    key: "qHyperCube",
                    data: data
                  }
                ],
                settings: {
                  collections: [
                    {
                      key: "stacked",
                      data: {
                        extract: {
                          field: dim,
                          props: {
                            line: { field: "state" },
                            end: { field: "=count(state)" }
                          }
                        },
                        stack: {
                          stackKey: d => d.value,
                          value: d => d.end.value
                        }
                      }
                    }
                  ],
                  scales: {
                    y: {
                      data: {
                        collection: {
                          key: "stacked"
                        }
                      },
                      invert: true,
                      expand: 0.3,
                      min: 0
                    },
                    t: { data: { extract: { field: dim } } },
                    color: { data: { extract: { field: "state" } }, type: "color" }
                  },
                  components: [
                    {
                      type: "axis",
                      dock: "left",
                      scale: "y"
                    },
                    {
                      type: "axis",
                      dock: "bottom",
                      scale: "t"
                    },
                    {
                      type: "legend-cat",
                      scale: "color",
                      dock: "right",
                    },
                    {
                      key: "lines",
                      type: "line",
                      data: {
                        collection: "stacked"
                      },
                      settings: {
                        coordinates: {
                          major: { scale: "t" },
                          minor0: { scale: "y", ref: "start" },
                          minor: { scale: "y", ref: "end" },
                          layerId: { ref: "line" }
                        },
                        layers: {
                          curve: "monotone",
                          line: {
                            show: true,
                            stroke: { scale: "color", ref: "line" },
                            strokeWidth: 1
                          },
                          area: {
                            fill: { scale: "color", ref: "line" },
                            opacity: 0.7
                          }
                        }
                      }
                    },
                    {
                      type: "text",
                      text: "Number of Projects",
                      style: {
                        text: {
                          fontSize: "12px",
                          fill: color
                        }
                      },
                      layout: {
                        dock: "left"
                      }
                    },
                    {
                      type: "text",
                      text: "Number of Projects by " + title,
                      style: {
                        text: {
                          fontSize: "14px",
                          fill: color
                        }
                      },
                      layout: {
                        dock: "top"
                      }
                    }
                  ]
                }
              });

        })
    }


}

export default lineChart