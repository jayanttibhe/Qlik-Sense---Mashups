import qSessionObject from '../objects/qSessionObject';

const lineData = new qSessionObject({
    qInfo: {
        qType: "line-hypercube"
    },
    qHyperCubeDef: {
        qDimensions: [
            {
                qDef: { qFieldDefs: ['state'] }
            },
            {
                qDef: { 
                    qFieldDefs: ['main_category'],
                    qSortCriterias: [{ qSortByNumeric: 1 }]
                 }
            }
        ],
        qMeasures: [
            {
                qDef: { qDef: '=count(state)' }
            }
        ],
        qInitialDataFetch: [
            {
                qHeight: 2000,
                qWidth: 3
            }
        ]
    }
})

export default lineData
