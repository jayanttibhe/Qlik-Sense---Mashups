import qSessionObject from '../objects/qSessionObject';

const kpiData = new qSessionObject({

    qInfo: {
        qType: 'kpi-hypercube'
    },
    qHyperCubeDef: {
        qMeasures: [
            {
                qDef: {
                    qDef: "count({<year_launched={'$(=max(year_launched))'}, state={'successful'}>}state)",
                    qLabel: "YTD Successful Projects"
                },
            },
            {
                qDef: {
                    qDef: "sum({<year_launched={'$(=max(year_launched))'}>}usd_goal_real)",
                    qLabel: "YTD Goal"
                },
            },
            {
                qDef: {
                    qDef: "sum({<year_launched={'$(=max(year_launched))'}>}usd_pledged_real)",
                    qLabel: "YTD Pledged"
                }
            }
        ],
        qInitialDataFetch: [
            {
                qHeight: 1,
                qWidth: 3
            }
        ]
    }

})

export default kpiData