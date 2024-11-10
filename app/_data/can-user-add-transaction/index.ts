import { auth, clerkClient } from "@clerk/nextjs/server"
import { getCurrentMonthTransaction } from "../get-current-month-transactions"

export const canUserAddTransaction = async () => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error("Unauthorized")
  }
  const user = (await clerkClient()).users.getUser(userId) //pegando obj do usuário
  if ((await user).publicMetadata.subscriptionPlan === "premium") {
    return true
  }
  const currentMonthTransaction = await getCurrentMonthTransaction()
  if (currentMonthTransaction >= 10) {
    return false
  }
  return true
}