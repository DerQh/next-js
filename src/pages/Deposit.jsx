import { useEffect, useState } from "react";
import formatCurrency from "../helpers/formatCurrency";
import ConfirmAmount from "../ui/Confirm";
import Confirmed from "../ui/Confirmed";
import EnterAmount from "../ui/PadInput";
import useUser from "../features/authentification/useUser";
import Loader from "../ui/Loader";

function Deposit() {
  const [mainOpen, setMainOpen] = useState(true);
  const [reviewDeposit, setreviewDeposit] = useState(false);
  const [sent, setSent] = useState(false);
  const [isValue, setIsValue] = useState([]);
  const [amount, setAmount] = useState();
  const { user: userData, isLoading } = useUser();
  const {
    firstName,
    lastName,
    sub: user_id,
    email,
    avatar,
  } = userData.user_metadata;

  const group = JSON.parse(localStorage.getItem("group"));

  const data = { amount, firstName, lastName, user_id, email, group, avatar };

  function handleSent() {
    setSent((sent) => !sent);
    setreviewDeposit((review) => !review);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (amount.length == 0) return;
    setreviewDeposit((review) => !review);
    setMainOpen((open) => !open);
  }
  function handleClick(event) {
    const value = event.target.value;
    if (value === "<") {
      isValue.pop();
      setIsValue((preValue) => [...preValue]);
      return;
    } else {
      if (amount.length > 10) return;
      setIsValue((preValue) => [...preValue, value]);
    }
  }


  useEffect(() => {
    const amount = isValue?.filter((pad) => pad < 10);
    let strings = amount?.join("");
    setAmount(formatCurrency(strings));
  }, [isValue, amount]);

  if (isLoading) return <Loader />;

  return (
    <>
      {sent && <Confirmed confirmedAmount={amount} data={data} />}
      {reviewDeposit && (
        <ConfirmAmount
          fullName={`${firstName}  ${lastName}`}
          avatar={avatar}
          onClick={handleSent}
          amount={amount}
        />
      )}
      {mainOpen && (
        <EnterAmount
          amount={amount}
          handleSubmit={handleSubmit}
          handleClick={handleClick}
          group={group}
        ></EnterAmount>
      )}
    </>
  );
}

export default Deposit;
