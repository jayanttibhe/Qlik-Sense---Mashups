picasso.chart({
    element: document.querySelector('#bar'),
    data: [
      {
        type: "matrix",
        data: [
          ["ID", "Month", "Sales","Margin"],
          [1, "Jan", 1106, 7],
          [2, "Feb", 644, 53],
          [3, "Mar",  147, 64],
          [4, "Apr", 1299, 47],
          [5, "May", 430, 32],
          [6, "Jun", 235, 13],
          [7, "Jul", 800, 20],
          [8, "Aug", 340, 12],
          [9, "Sep", 249, 69],
          [10, "Oct", 999, 17],
          [11, "Nov", 630, 42],
          [12, "Dec", 535, 35]
        ]
      }
    ],
    settings: {
      scales: {
        y: {
          data: { field: 'Sales' },
          invert: true,
          include: [0]
        },
        c: {
          data: { field: 'Sales' },
          type: 'color'
        },
        t: { data: { extract: { field: 'Month' } }, padding: 0.3 },
      },
      components: [{
        type: 'axis',
        dock: 'left',
        scale: 'y'
      },{
        type: 'axis',
        dock: 'bottom',
        scale: 't'
      },{
        key: 'bars',
        type: 'box',
        data: {
          extract: {
            field: 'Month',
            props: {
              start: 0,
              end: { field: 'Sales' }
            }
          }
        },
        settings: {
          major: { scale: 't' },
          minor: { scale: 'y' },
          box: {
            fill: { scale: 'c', ref: 'end' }
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
        text: "Y Axis",
        layout: {
          dock: "left"
        }
      },
      {
        type: "text",
        text: "Title",
        layout: {
          dock: "top"
        }
      }]
    }
  })