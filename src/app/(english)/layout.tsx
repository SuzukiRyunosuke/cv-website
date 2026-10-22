import "../globals.css";
import { profileMetadata } from "../metadata";
export const metadata = profileMetadata("en");
export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
