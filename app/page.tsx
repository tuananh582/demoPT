import { redirect } from "next/navigation";

// Redirect to landing page
export default function Home() {
  redirect("/landing");
}
