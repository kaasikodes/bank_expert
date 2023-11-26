import { DEFAULT_WALLET_CHAINS } from "../constants";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { Button } from "antd";
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
export const SendCoins: React.FC<TProps> = ({ open, onClose, onSubmit, selectedChain }) => {
  const [form] = Form.useForm<TAddCategorySubmitData>();
  return (
    <Modal
      title="Send Coins"
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
      }
    >
      <Form form={form} labelCol={{ span: 24 }} requiredMark={false} onFinish={onSubmit?.fn}>
        <Form.Item
          name="coinDetails"
          label="Transaction Details"
          help={
            <div
              className="bg-green-400 flex items-center gap-2 text-white mt-2 mb-3 px-2 py-2 rounded-lg"
              style={{ background: "#E1FCEF", color: "#14804A" }}
            >
              <div
                className="w-2 h-2 rounded-full bg-green-500"
                style={{ background: "#14804A", width: "0.5rem", height: "0.5rem" }}
              />
              <span>to: 0x04433bHNKMKHJ889999922334444</span>
            </div>
          }
        >
          <Input.Group compact className="w-full">
            <Form.Item noStyle>
              <Select
                suffixIcon={null}
                style={{ width: "10%" }}
                disabled
                value={selectedChain}
                options={DEFAULT_WALLET_CHAINS.map(chain => ({
                  value: chain.key,

                  label: (
                    <div className="flex gap-2 items-center">
                      <span>{chain.icon}</span>
                      {/* <span className="capitalize">{chain.name}</span> */}
                    </div>
                  ),
                }))}
              />
            </Form.Item>
            <Form.Item noStyle name={["coinDetails", "coin"]}>
              <Select placeholder="Select Coin" style={{ width: "25%" }} />
            </Form.Item>
            <Form.Item noStyle name={["coinDetails", "amount"]}>
              <InputNumber style={{ width: "40%" }} placeholder="Amount" />
            </Form.Item>
            <Form.Item noStyle>
              <Input style={{ width: "25%" }} placeholder="Fee" disabled value={"fee $00.00"} />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item
          label="Comment (optional)"
          name={EAddCategoryFormItemName.comment}
          rules={[
            { required: false },
            { whitespace: true, message: "Comment has to be a non empty value!" },
            // TODO: Add address validator
            // TODO: Move validation to utils for reusability
          ]}
        >
          <Input.TextArea placeholder="Write Here ...." rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
