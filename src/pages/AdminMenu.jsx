import React from "react"
import { useSession } from "@/web/components/SessionContext"
import Link from "@/web/components/ui/Link"
import { navStyles, ulStyles, liStyles, linkStyles } from "@/web/components/ui/AdminMenuStyle"

const AdminMenu = ({ children: _, ...otherProps }) => {
  const { session } = useSession()
  const isAdmin = session && session.isAdmin

  return (
    <nav {...otherProps} className={navStyles}>
      <ul className={ulStyles}>
        {isAdmin ? (
          <>
            <li className={`${liStyles.base} ${liStyles.list}`}>
              <Link href="/admin/listusers" className={linkStyles}>
                User List
              </Link>
            </li>
            <li className={`${liStyles.base} ${liStyles.delete}`}>
                <Link href="/admin/deleteuser" className={linkStyles}>
                 Delete User
              </Link>
            </li>
            <li className={`${liStyles.base} ${liStyles.edit}`}>
              <Link href="/admin/edituser" className={linkStyles}>
                Edit User
              </Link>
            </li>
            <li className={`${liStyles.base} ${liStyles.disable}`}>
              <Link href="/admin/disableuser" className={linkStyles}>
                Disable User
              </Link>
            </li>
          </>
        ) : (
          <><li className={`${liStyles.base}`}>
              <p style={{ color: "red" }}>You are not an administrator.</p>
            </li><li className={`${liStyles.base} ${liStyles.disable}`}>
                <Link href="/" className={linkStyles}>
                  Return to menu
                </Link>
              </li></>
        )}
      </ul>
    </nav>
  )
}

export default AdminMenu
