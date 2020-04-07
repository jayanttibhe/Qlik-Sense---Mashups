import getApp from '../app';

class qSessionObject {
    constructor(properties) {
        this.properties = properties; 
        this.object = null
    }

    open(){
        if(!this.object){
            return getApp.then(app => {
                return app.createSessionObject(this.properties).then(object => {
                    this.object = object
                })
            })
        }
    }

    patchYear(){
        if(this.object){
            return this.object.applyPatches(
                [
                    {
                        qPath: "/qHyperCubeDef/qDimensions/1/qDef/qFieldDefs/0",
                        qOp: "replace",
                        qValue: '"year_launched"'
                    }
                ],
                true
            )
        }
    }

    patchCategory(){
        if(this.object){
            return this.object.applyPatches(
                [
                    {
                        qPath: "/qHyperCubeDef/qDimensions/1/qDef/qFieldDefs/0",
                        qOp: "replace",
                        qValue: '"main_category"'
                    }
                ],
                true
            )
        }
    }

}

export default qSessionObject;