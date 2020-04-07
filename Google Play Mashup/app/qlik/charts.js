define([], function() {
  console.log("charts loaded");

  //Combo Chart
  app.visualization.create(
      "combochart", 
      [
        {
            qDef: {
                qFieldDefs: [
                    "Category"
            ],
            qFieldLabels: [
                "Category"
            ],
            qSortCriterias: [
                {
                    qSortByExpression: -1,
                    qExpression: {
                        qv: "Sum([Approx. Number of Installs])"
                    }
                }
            ]
            }
        },
        {
            qDef: {
                qLabel: "Approx. Number of Installs",
                qDef: "Sum([Approx. Number of Installs])",
                series: {
                    type: "bar",
                    axis: 0
                }
            }
        },
        {
            qDef: {
                qLabel: "Average Rating",
                qDef: "Avg(Rating)",
                series: {
                    type: "line",
                    axis: 1
                }
            }
        }    
    ],
    {
        showTitles: true,
        title: "Number of Installs and Average Rating by Category"
    }
  ).then(function(viz){
      viz.show("QV05")
  });


  //Treemap Chart
  app.visualization.create(
      "treemap",
      [
        {
          qDef: {
            qFieldDefs: ["Category"]
          }
        },
        {
          qDef: {
            qFieldDefs: ["App"]
          },
          qOtherTotalSpec: {
            qOtherMode: "OTHER_COUNTED",
            qOtherCounted: {
              qv: "10"
            },
            qSuppressOther: true
          },
          qNullSuppression: true
        },
        {
          qDef: {
            qLabel: "Frequency",
            qDef: "Sum([Approx. Number of Installs])"
          }
        }
      ],
      {
        showTitles: true,
        title: "Number of App Installs by Category"
      },
      {
        color: {
          auto: false,
          mode: "byDimension",
          dimesnionScheme: "12",
          byDimDef: {
            key: "Category"
          }
        }
      }
    )
    .then(function(viz) {
      viz.show("QV04");
    });

  //KPIs
  //Highest Grossing
  app.visualization
    .create(
      "kpi",
      [
        {
          qDef: {
            qLabel: "Highest Grossing (on Purchase)",
            qDef:
              "FirstSortedValue(distinct App,-Aggr(sum([Approx. Revenue ($)]),App))"
          }
        }
      ],
      {
        showTitles: false,
        showMeasureTitle: true,
        textAlign: "center",
        fontSize: "M"
      }
    )
    .then(function(viz) {
      viz.show("QV01");
    });

  //Highest Number of Installs
  app.visualization
    .create(
      "kpi",
      [
        {
          qDef: {
            qLabel: "Highest Number of Installs",
            qDef:
              "FirstSortedValue(distinct App,-Aggr(sum([Approx. Number of Installs]),App))"
          }
        }
      ],
      {
        showTitles: false,
        showMeasureTitle: true,
        textAlign: "center",
        fontSize: "M"
      }
    )
    .then(function(viz) {
      viz.show("QV02");
    });

  //Most Reviewed
  app.visualization
    .create(
      "kpi",
      [
        {
          qDef: {
            qLabel: "Highest Number of Reviews",
            qDef: "FirstSortedValue(distinct App,-Aggr(sum([Reviews]),App))"
          }
        }
      ],
      {
        showTitles: false,
        showMeasureTitle: true,
        textAlign: "center",
        fontSize: "M"
      }
    )
    .then(function(viz) {
      viz.show("QV03");
    });
});
