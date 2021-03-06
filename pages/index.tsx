import Head from "next/head";
import { Typography, Space, message, Popconfirm } from "antd";
import { CopyOutlined, CopyTwoTone, MehFilled } from "@ant-design/icons";
import ResumeButton from "../components/resume/ResumeButton";
import resumeStyles from "../styles/resume.module.scss";
import { useEffect, useState, useRef } from "react";
import { BlockProps, BlOCKNAME } from "../components/blocks/BlockTypes";
import BaseEditBlock from "../components/blocks/BaseEditBlock";
import BaseShowBlock from "../components/blocks/BaseShowBlock";
import exportAsImage from "../lib/exportAsImage";
import copy from "copy-to-clipboard";

export default function Home(props) {
  const { BlockDatas } = props;
  const [blockDatas, setBlockDatas] = useState<BlockProps[]>(
    BlockDatas.filter((item) => {
      if (item.isUsed) {
        return item;
      }
    }).concat(
      BlockDatas.filter((item) => {
        if (!item.isUsed) {
          return item;
        }
      })
    )
  ); // 初始化数据，将使用和未使用分段区分，便于拖拽排序

  const { Title } = Typography;
  const [dragIndex, setDragIndex] = useState(0); // 拖拽下标
  const [dropIndex, setDropIndex] = useState(0); // 放置下标
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0); // 当前选中的简历项目下标，只能在可拖拽中选，默认为基本信息

  const exportRef = useRef();

  const handlerDelete = function (moduleBtnsIndex) {
    // 清空字段的数据
    blockDatas.forEach((item) => {
      if (item.blockId == moduleBtnsIndex) {
        item.isUsed = false;
      }
    });
    setBlockDatas([...blockDatas]);
  };
  const handlerAdd = function (moduleBtnsIndex) {
    // 清空字段的数据
    blockDatas.forEach((item) => {
      if (item.blockId == moduleBtnsIndex) {
        item.isUsed = true;
      }
    });
    setBlockDatas([...blockDatas]);
  };
  const handlerBlockChange = (e, a, f) => {
    console.log(e.target.value, a, f);
    blockDatas
      .find((item) => {
        if (item.blockId == a) {
          return item;
        }
      })
      .rawDatas.find((item) => {
        if (item.id == f) {
          return item;
        }
      }).value = e.target.value;
    setBlockDatas([...blockDatas]);
  };
  // 退出登陆
  const signOut = () => {};

  return (
    <div>
      <Head>
        <title>简历生成器</title>
      </Head>
      <div>
        <div className={resumeStyles.resume_container}>
          <div className={resumeStyles.resume_operate}>
            <div className={resumeStyles.resume_divider}>
              <Title level={5} style={{ color: "#515666" }}>
                模块管理
              </Title>
            </div>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div
                onClick={() => {
                  setCurrentBlockIndex(0);
                }}
              >
                <ResumeButton title="基本信息" />
              </div>
              <div>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {Array.isArray(blockDatas) &&
                    blockDatas
                      .filter((item) => {
                        if (item.isUsed && item.blockId !== "0") {
                          return item;
                        }
                      })
                      .map((moduleBtnsItem, moduleBtnsIndex) => {
                        return (
                          <div
                            key={moduleBtnsIndex}
                            onClick={() => {
                              setCurrentBlockIndex(
                                Number(moduleBtnsItem.blockId)
                              );
                            }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDropIndex(moduleBtnsIndex + 1);
                            }}
                            style={{
                              borderBottom:
                                dropIndex == moduleBtnsIndex + 1
                                  ? "2px solid #68749c"
                                  : "2px solid transparent",
                            }}
                          >
                            <div
                              draggable
                              onDragStart={(e) => {
                                setDragIndex(moduleBtnsIndex);
                              }}
                              onDragEnd={(e) => {
                                e.preventDefault();
                                let temp = blockDatas[dragIndex + 1];
                                blockDatas[dragIndex + 1] =
                                  blockDatas[dropIndex];
                                blockDatas[dropIndex] = temp;
                                setBlockDatas([...blockDatas]);
                                setDropIndex(0);
                              }}
                            >
                              <ResumeButton
                                title={BlOCKNAME[moduleBtnsItem.blockId]}
                                isDrag
                                onDelete={() => {
                                  handlerDelete(moduleBtnsItem.blockId);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                </Space>
              </div>
            </Space>
            <div className={resumeStyles.resume_divider}>
              <Title level={5} style={{ color: "#515666" }}>
                添加模块
              </Title>
            </div>
            <Space direction="vertical" style={{ width: "100%" }}>
              {Array.isArray(blockDatas) &&
                blockDatas
                  .filter((item) => {
                    if (!item.isUsed) {
                      return item;
                    }
                  })
                  .map((moduleBtnsItem, moduleBtnsIndex) => {
                    return (
                      <div key={moduleBtnsIndex}>
                        <div>
                          <ResumeButton
                            isUsed={false}
                            title={BlOCKNAME[moduleBtnsItem.blockId]}
                            onAdd={() => {
                              handlerAdd(moduleBtnsItem.blockId);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
            </Space>
          </div>
          <div className={resumeStyles.resume_main}>
            <div className={resumeStyles.resume_main_body} ref={exportRef}>
              <div className={resumeStyles.resume_main_body_title}>简历</div>
              <BaseShowBlock
                rawData={
                  blockDatas.find((item) => {
                    if (item.blockId == "0") {
                      return item;
                    }
                  }).rawDatas
                }
              />
              {Array.isArray(blockDatas) &&
                blockDatas
                  .filter((item) => {
                    if (item.isUsed && item.blockId !== "0") {
                      return item;
                    }
                  })
                  .map((item, index) => (
                    <div key={index}>
                      <div className={resumeStyles.resume_main_body_subtitle}>
                        {BlOCKNAME[item.blockId]}
                      </div>
                      <BaseShowBlock rawData={item.rawDatas} />
                    </div>
                  ))}
            </div>
          </div>
          <div className={resumeStyles.resume_edit}>
            <div className={resumeStyles.resume_edit_top}>
              <Popconfirm
                title={() => (
                  <div>
                    <Space>
                      <span>用户名：{currentBlockIndex}</span>
                      <span>是否退出登陆？</span>
                    </Space>
                  </div>
                )}
                placement="bottomRight"
                okText="是"
                cancelText="否"
                icon={<MehFilled style={{ color: "#8a9cee" }} />}
                onConfirm={signOut}
              >
                <div
                  className={resumeStyles.resume_edit_avatar}
                  style={{
                    backgroundImage:
                      "url(https://pic1.zhimg.com/v2-1c1e177072769ae8fc51faecf905417d_400x224.jpg?source=7e7ef6e2)",
                  }}
                ></div>
              </Popconfirm>
            </div>
            <div className={resumeStyles.resume_edit_bottom}>
              <div>{BlOCKNAME[String(currentBlockIndex)]}</div>
              <div>
                <BaseEditBlock
                  handlerBlockChange={handlerBlockChange}
                  BaseEditBlockData={blockDatas.find((item) => {
                    if (Number(item.blockId) == currentBlockIndex) {
                      return item;
                    }
                  })}
                />
              </div>

              <div className={resumeStyles.resume_edit_btns}>
                <div className="button-unchecked">
                  <a
                    style={{
                      color: "#8a9cee",
                    }}
                    href={`/resume?userId=zhypower1997`}
                  >
                    SHARE LINK
                  </a>
                </div>
                <div
                  style={{
                    marginRight: "8px",
                    borderLeft: "none",
                  }}
                  className="button-unchecked"
                  onClick={() => {
                    copy(location.href + "resume?userId=" + currentBlockIndex);
                    message.info({
                      content: "地址复制成功，快去分享你的简历吧～",
                      icon: (
                        <span>
                          <CopyOutlined
                            style={{ fontSize: "18px", color: "#8a9cee" }}
                          />
                        </span>
                      ),
                    });
                    console.log(
                      location.href + "resume?userId=" + currentBlockIndex
                    );
                  }}
                >
                  <CopyTwoTone
                    style={{ fontSize: "18px" }}
                    twoToneColor="#8a9cee"
                  />
                </div>
                <div
                  className="button-checked"
                  onClick={() => exportAsImage(exportRef.current, "MyResume")}
                >
                  DOWNLOAD
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

let a = async function () {
  return new Promise((res, rej) => {
    res([
      {
        blockId: "0",
        rawDatas: [
          {
            id: "1",
            value: "11",
            name: "姓名",
            isRequired: true,
            typeId: "0",
          },
        ],
        isUsed: true,
      },
      {
        blockId: "1",
        rawDatas: [
          {
            id: "1",
            value: "张三",
            name: "姓名",
            isRequired: true,
            typeId: "0",
          },
        ],
        isUsed: true,
      },
      { blockId: "2", rawDatas: [], isUsed: false },
      {
        blockId: "3",
        rawDatas: [
          {
            id: "1",
            value: "里斯",
            name: "姓名",
            isRequired: true,
            typeId: "2",
          },
        ],
        isUsed: true,
      },
      {
        blockId: "4",
        rawDatas: [
          {
            id: "1",
            value: "王五",
            name: "姓名",
            isRequired: true,
            typeId: "1",
          },
          {
            id: "2",
            value: "10",
            name: "年龄",
            isRequired: true,
            typeId: "0",
          },
        ],
        isUsed: true,
      },
    ]);
  });
};
Home.getInitialProps = async () => {
  let b = await a();
  return {
    BlockDatas: b,
  };
};
