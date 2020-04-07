import qSessionObject from "../objects/qSessionObject";

const trendData = new qSessionObject({
    qInfo: {
        qType: "trend-hypercube"
    },
    qHyperCubeDef: {
        qDimensions: [
            {
                qDef: {
                    qFieldDefs: ["year_launched"],
                    qSortCriterias: [{
                        qSortByNumeric: 1,
                    }]
                }
            }
        ],
        qMeasures: [
            {
                qDef: {
                    qDef: "=sum(usd_pledged_real)",
                    qLabel: "Total Pledged (USD)"
                }
            }
        ],
        qInitialDataFetch: [
            {
                qHeight: 2000,
                qWidth: 2
            }
        ]
    }
})

export default trendData