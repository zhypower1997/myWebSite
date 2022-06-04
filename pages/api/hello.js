export default (req, res) => {
  res.status(200).json([{blockId: '1',rawDatas: [{id:'1', value: '张三', name: '姓名',isRequired: true,typeId:'0'}]},{blockId: '2', rawDatas: []}])
}
