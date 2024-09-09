class Model{
	constructor(getDatabaseReference) {
		this.databaseRef = getDatabaseReference;
	}
	
	getter = (path) => {
		return new Promise((resolve, reject) => {
			try {
				const ref = this.databaseRef.ref(path);
				ref.on(
					'value',
					(snapshot) => {
					resolve(snapshot.val());
					},
					(errorObject) => {
					reject(errorObject.name);
					}
				);
			} catch (error) {
				reject(error);
			}
		});
	};

	getterAsync = function (path, callback) {
		this.databaseRef.ref(path).once('value')
		.then((snapshot) => {
			callback(null, snapshot);
		})
		.catch((error) => {
			callback(error, null);
		});
	};

	setter(path, data, childPath) {
		return new Promise((resolve, reject) => {
			try {
				const ref = this.databaseRef.ref(path).child(childPath);
				ref.set(data).then((res) => {
				resolve({ msg: 'successfully saved data' });
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	setterAsync = function (path, data, childPath, callback) {
		const ref = childPath ? this.databaseRef.ref(path).child(childPath) : this.databaseRef.ref(path);
		ref.set(data)
		.then(() => {
			callback(null, { msg: 'successfully saved data' });
		})
		  .catch((error) => {
			callback(error, null);
		});
	};

	update(path, data, childPath) {
		return new Promise((resolve, reject) => {
			try {
				const ref = childPath ? this.databaseRef.ref(path).child(childPath) : this.databaseRef.ref(path);
				ref
				.update(data)
				.then((res) => {
					resolve({ msg: 'successfully updated data' });
				})
				.catch((error) => {
					reject({ err: error });
				});
			} catch (error) {
				reject({ err: error });
			}
		});
	};

	updateAsync = function (path, data, childPath, callback) {
		const ref = childPath ? this.databaseRef.ref(path).child(childPath) : this.databaseRef.ref(path);
		ref.update(data)
		.then(() => {
			callback(null, { msg: 'successfully updated data' });
		})
		.catch((error) => {
			callback(error, null);
		});
	};
}

export default Model;