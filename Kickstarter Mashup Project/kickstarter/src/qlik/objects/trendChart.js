import picasso from "picasso.js";
import picassoQ from "picasso-plugin-q";

class trendChart {
  constructor(data){
    this.data = data
  }

  init(color){
    this.data.object.getLayout().then(layout => {
      this.layout = layout;
      this.update(color)
    })
  }

  update(color){
    this.data.object.getLayout().then(layout => {
      let data = layout.qHyperCube

      //Initialise PicassoQ 
      picasso.use(picassoQ)

      picasso.chart({
        element: document.querySelector("#trend-chart"),
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
              data: { field: "Total Pledged (USD)" },
              invert: true,
              expand: 0.05
            },
            t: { data: { extract: { field: "year_launched" } } }
          },
          components: [
            {
              type: "axis",
              dock: "left",
              scale: "y",
              formatter: {
                type: "d3-number",
                format: "$.2s"
              }
            },
            {
              type: "axis",
              dock: "bottom",
              scale: "t",
              formatter: {
                type: "d3-time",
                format: "%Y-%m"
              }
            },
            {
              key: "lines",
              type: "line",
              data: {
                extract: {
                  field: "year_launched",
                  props: {
                    v: { field: "Total Pledged (USD)" }
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
                  line: {}
                }
              }
            },
            {
                key: "lines",
                type: "line",
                data: {
                  extract: {
                    field: "year_launched",
                    props: {
                      p: { field: "Total Pledged (USD)" }
                    }
                  }
                },
                settings: {
                  coordinates: {
                    major: { scale: "t" },
                    minor: { scale: "y", ref: "p" }
                  },
                  layers: {
                    curve: "monotone",
                    line: {}
                  }
                }
              },
              {
                type: "text",
                text: "Total Pledged ($)",
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

export default trendChart


