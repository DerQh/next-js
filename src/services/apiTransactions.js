import formatCurrency, { formatMoney } from "../helpers/formatCurrency";
import supabase from "./supabase";

const date = new Date().toISOString();

// the variable should be on curly braces inorder to use useMutation , but in normal API call remove the braces
export async function insertTransaction({
  user_id,
  amount,
  group,
  email,
  name,
  avatar,
}) {
  // console.log(amount);
  let { data, error } = await supabase.from("transactions").insert([
    {
      name: name,
      status: "pending",
      amount: amount,
      user_id: user_id,
      email: email,
      group: group,
      type: "deposit",
      profileUrl: avatar,
    },
  ]);

  if (error) throw new Error(error);
  return data;
}

export async function getTransactions(group) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("group", group)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error);
  return data;
}

export async function getTransaction(id) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id);

  if (error) throw new Error(error);
  // console.log(data);
  return data;
}

export async function getUserTransaction(user_id) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user_id);
  if (error) throw new Error(error);
  // console.log(data);
  return data;
}

export async function updateTransaction({ transactionId, userId }) {
  const { data, error } = await supabase
    .from("transactions")
    .update({
      status: "approved",
      approved: true,
      approved_by: userId,
      approval_date: date,
    })
    .eq("id", transactionId)
    .select();

  if (error) throw new Error(error);
  return data;
}

export async function rejectTransaction({ transactionId, userId }) {
  const { data, error } = await supabase
    .from("transactions")
    .update({
      status: "rejected",
      approved: true,
      approved_by: userId,
      approval_date: date,
    })
    .eq("id", transactionId)
    .select();

  if (error) throw new Error(error);
  return data;
}

export async function getTotal(group) {
  const status = "approved";
  let { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("group", group)
    .eq("type", "deposit")
    .eq("status", status);
  if (error) throw new Error(error);
  const amountArray = data.map((dat) => {
    let nums = parseFloat(dat.amount.replace(/,/g, ""));
    const amount = nums.toFixed(2);
    return +amount;
  });
  const total = amountArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  // transaction have transaction_num the increases , the highest number is the latest deposit
  const transactioNumarray = data.map((transa) => transa.transaction_num);
  const lastTransactionNum = Math.max(...transactioNumarray);
  // get the last transaction from data, filter using the lasttransactionNUm
  const lastTransaction = data.filter(
    (transaction) => transaction.transaction_num == lastTransactionNum
  );
  // console.log(formatMoney(total));
  // console.log(lastTransaction);
  return { total, data, lastTransaction };
}
