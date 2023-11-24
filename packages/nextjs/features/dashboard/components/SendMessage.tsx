import { Empty, Form, Input, Modal, Skeleton } from "antd";
import { Button } from "antd";
import { MessageList } from "react-chat-elements";
import { TModalProps } from "~~/types/general";

enum EAddCategoryFormItemName {
  comment = "comment",
}
type TAddCategorySubmitData = {
  [EAddCategoryFormItemName.comment]: string;
};
type AddCategoryProps = {
  onSubmit: { fn: (data: TAddCategorySubmitData) => void; isLoading?: boolean };
  selectedChain: string;
};
type TProps = TModalProps & AddCategoryProps;

const DUMMY_MESSAGES = [
  {
    id: 1,
    taskId: 2,
    commenterId: 1,
    comment: "GM, I'll be in touch with you shortly. Thank you.",
    companyId: 1,
    createdAt: "2023-11-14T08:45:53.000Z",
    updatedAt: "2023-11-14T08:45:53.000Z",
    commenter: {
      id: 1,
      firstName: "Grace",
      lastName: "Komolafe",
      email: "oluwatoyin@snapnetsolutions.com",
      hasSelfService: true,
      empUid: "EMP387451",
      roleId: 1,
      status: "confirmed",
      companyId: 1,
      designationId: 1,
      userId: 1,
      avatarUrl: "",
      createdAt: "2023-02-10T05:19:35.000Z",
      updatedAt: "2023-10-10T11:15:13.000Z",
      deletedAt: null,
    },
  },
  {
    id: 2,
    taskId: 2,
    commenterId: 1,
    comment: "Hello",
    companyId: 1,
    createdAt: "2023-11-14T08:45:53.000Z",
    updatedAt: "2023-11-14T08:45:53.000Z",
    commenter: {
      id: 1,
      firstName: "James",
      lastName: "Komolafe",
      email: "oluwatoyin@snapnetsolutions.com",
      hasSelfService: true,
      empUid: "EMP387451",
      roleId: 1,
      status: "confirmed",
      companyId: 1,
      designationId: 1,
      userId: 1,
      avatarUrl: "",
      createdAt: "2023-02-10T05:19:35.000Z",
      updatedAt: "2023-10-10T11:15:13.000Z",
      deletedAt: null,
    },
  },
];
const data = { total: DUMMY_MESSAGES.length, data: DUMMY_MESSAGES };
export const SendMessage: React.FC<TProps> = ({ open, onClose, onSubmit }) => {
  const [form] = Form.useForm<TAddCategorySubmitData>();

  return (
    <Modal
      title="Send Message"
      style={{ top: 20 }}
      open={open}
      onCancel={onClose}
      classNames={{
        header: "shadow-sm",
        body: "shadow-sm",
      }}
      styles={{
        header: {
          paddingBottom: "10px",
          padding: "10px 24px 10px 24px",
        },
        footer: {
          padding: "10px 24px 10px 24px",
        },
        body: {
          padding: "10px 24px 24px 24px",
          background: "#F7F9FC",
          margin: 0,
        },
        content: {
          padding: 0,
        },
      }}
      footer={
        <div className="flex flex-col gap-2">
          <Input placeholder="Please enter an appropriate messae!" className="self-end" />
          <div className="flex gap-4 justify-end">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              style={{ background: "#5E5ADB" }}
              loading={onSubmit?.isLoading}
            >
              Send
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Skeleton loading={false} active paragraph={{ rows: 14 }}>
          {data && data?.total === 0 ? (
            <div className="flex flex-col h-full items-center justify-center">
              <Empty description="No comments yet" />
            </div>
          ) : null}
          <MessageList
            toBottomHeight={"100%"}
            className="message-list"
            dataSource={
              !data
                ? []
                : data?.data.map((comment, i) => ({
                    avatar: comment.commenter.avatarUrl,
                    text: comment.comment,
                    title: comment.commenter.firstName,
                    date: new Date(comment.createdAt),
                    type: "text",
                    id: comment.id,
                    titleColor: "red",
                    position: i === 1 ? "left" : "right",
                    focus: false,
                    forwarded: false,
                    replyButton: false,
                    removeButton: false,
                    retracted: false,
                    notch: false,
                    status: "read",
                  }))
            }
            referance={null}
            lockable
          />
        </Skeleton>
      </div>
    </Modal>
  );
};
