export interface BlockProps {
  blockId: string;
  typeCounts?: number; // 如果rawData都存入数据库，此字段可省略
  isUsed: boolean; // 是否启用
  rawDatas: RawData[];
}
export interface RawData {
  id: string;
  typeId: string; // 编号（1，2，3，4...）用于查看谁为空
  type: string; // 类型：日期、多选、单选、文件
  name: string;
  value: object | number | string | null; // null则为未填
  isRequired: boolean; // 是否必须填写
}
// BaseBlockId: 0
export enum BlOCKID {
  "BASE",
  "EDUCATION",
  "INTERN",
  "PRODUCT",
  "HONOR",
}
export const BlOCKNAME = {
  "0": "基础信息",
  "1": "教育经历",
  "2": "实习经历",
  "3": "项目经历",
  "4": "荣誉奖项",
};
export interface BaseBlockRawData {
  baseName: {
    type: string; // 类型：日期、多选、单选、文件
    value: object | string | null; // null则为未填
    isRequired: boolean; // 是否必须填写
  };
  baseBirth: {
    type: string; // 类型：日期、多选、单选、文件
    value: object | string | null; // null则为未填
    isRequired: boolean; // 是否必须填写
  };
}
