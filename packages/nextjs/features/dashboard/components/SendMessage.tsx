import { useEffect } from "react";
import { DEFAULT_WALLET_CHAINS } from "../constants";
import { useSendMessageCrossChain } from "./WalletDetails";
import { Input, Modal, Skeleton } from "antd";
import { Button, Select } from "antd";
import { TxReceipt } from "~~/components/scaffold-eth";
import { TModalProps } from "~~/types/general";

enum EAddCategoryFormItemName {
  comment = "comment",
}
type TAddCategorySubmitData = {
  [EAddCategoryFormItemName.comment]: string;
};
type AddCategoryProps = {
  onSubmit?: { fn: (data: TAddCategorySubmitData) => void; isLoading?: boolean };
  selectedChain: string;
  contractAddress: string;
};
type TProps = TModalProps & AddCategoryProps;

export const SendMessage: React.FC<TProps> = ({ open, onClose, selectedChain, contractAddress }) => {
  // ______________

  const { form, setForm, onSubmit, isLoading, deployedContractLoading, displayedTxResult, setDisplayedTxResult } =
    useSendMessageCrossChain({ deployedContractAddress: contractAddress });

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      destinationChainSelector: selectedChain,
    }));
  }, [selectedChain, setForm]);
  const handleForm = (key: string, value: string | number | null) => {
    setForm(form => ({ ...form, [key]: value }));
  };
  const handleCancel = () => {
    setForm({});
    setDisplayedTxResult(undefined);
    onClose();
  };

  return (
    <Modal
      title="Send Message"
      style={{ top: 20 }}
      open={open}
      onCancel={handleCancel}
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
          <div className="flex gap-4 justify-end">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={onSubmit} style={{ background: "#5E5ADB" }} loading={isLoading}>
              Send
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <Skeleton loading={deployedContractLoading} active paragraph={{ rows: 14 }}>
          <div className="flex flex-col gap-2">
            <Input.Group compact className="w-full">
              {" "}
              <Select
                suffixIcon={null}
                style={{ width: "10%" }}
                disabled
                value={selectedChain}
                options={DEFAULT_WALLET_CHAINS.map(chain => ({
                  value: chain.chainId,

                  label: (
                    <div className="flex gap-2 items-center">
                      <span>{chain.icon}</span>
                      {/* <span className="capitalize">{chain.name}</span> */}
                    </div>
                  ),
                }))}
              />
              <Input
                style={{ width: "90%" }}
                placeholder="Receiver"
                value={form?.receiver}
                onChange={e => handleForm("receiver", e.target.value)}
              />
            </Input.Group>
            <Input.TextArea
              rows={3}
              value={form?.text}
              placeholder="Please enter an appropriate message!"
              onChange={e => handleForm("text", e.target.value)}
              className="self-end"
            />
            {displayedTxResult ? <TxReceipt txResult={displayedTxResult} /> : null}
          </div>
        </Skeleton>
      </div>
    </Modal>
  );
};
