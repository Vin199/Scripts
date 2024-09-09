import { appDB } from '../db/firebase.js';
import Model from '../model/model.js';
const appModel = new Model(appDB);

class Controller{
	moveScreenText = async (req, res) => {
		try {
			const {path, screen_text_path} = req.query;

			if(!path || !screen_text_path) return res.status(400).json({error : 'params missing!'});

			appModel.getterAsync(path, async (error, snapshot) => {
				const data = snapshot.val();
				if (error) {
					throw new Error(error);
				}

				if(!data){
					return res.status(404).json({error : "Screen text not found in temp node."});
				}

				const { english, hindi } = data;
				//increase english and hindi version by 1
				const updatedScreenText = {
					english: { ...english, version: english.version + 1 },
					hindi: { ...hindi, version: hindi.version + 1 }
				};

				//take backup of existing screen_text;
				appModel.getterAsync(screen_text_path, (error, snapshot) => {
					if(error){
						throw new Error(error);
					}
					const existingScreenText = snapshot.val();
					if(!existingScreenText){
						return res.status(404).json({error : "Screen text not found in production node."});
					}
					appModel.setterAsync(`backup${screen_text_path}`, existingScreenText, null, (error, data) => {
						if(data?.msg){
							appModel.setterAsync(screen_text_path, updatedScreenText, null, (error, data) => {
								const saveText = data?.msg;
								res.json({data : 'Screen Text Updated Successfully in production node.', msg : saveText});
							})
						}
					})
				})
			})
		} catch (error) {
			res.status(500).json({error : error?.message || error})
		}
	}
}

export default Controller;