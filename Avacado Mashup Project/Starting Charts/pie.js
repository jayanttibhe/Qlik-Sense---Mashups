picasso.chart({
    element: document.querySelector('#container'),
    data,
    settings: {
      scales: {
        c: {
          data: { extract: { field: 'Year' } }, type: 'color'
        }
      },
      components: [{
        type: 'legend-cat',
        scale: 'c'
      },{
        key: 'p',
        type: 'pie',
        data: {
          extract: {
            field: 'Year',
            props: {
              num: { field: 'Sales' }
            }
          }
        },
        settings: {
          slice: {
            arc: { ref: 'num' },
            fill: { scale: 'c' },
            outerRadius: () => 0.9,
            strokeWidth: 1,
            stroke: 'rgba(255, 255, 255, 0.5)'
          }
        }
      }]
    }
  })