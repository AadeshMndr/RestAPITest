const accessDB = async () => {
    const client = await MongoClient.connect(
        `mongodb+srv://admin:admin@nodetutorial.vmr3qt7.mongodb.net/test`
      );
  
      const db = client.db();
  
      const selectedCollection = db.collection(collection);
  
  
      let result = await action(data, selectedCollection);
  
      client.close();
}