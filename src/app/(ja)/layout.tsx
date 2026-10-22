import "../globals.css";
import { profileMetadata } from "../metadata";
export const metadata = profileMetadata("ja");
export default function JapaneseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
