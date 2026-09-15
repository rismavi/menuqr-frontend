import { NavLink } from "react-router-dom";
import { useAdminProfile } from "../../context/AdminProfileContext";

function AdminSidebar() {
  const { profile } = useAdminProfile();

  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: "⌂" },
    { label: "Menu", path: "/admin/menu", icon: "▦" },
    { label: "Kategori", path: "/admin/category", icon: "☷" },
    { label: "Variant", path: "/admin/variant", icon: "◈" },
    { label: "Add-on", path: "/admin/addon", icon: "+" },
    { label: "Pesanan", path: "/admin/orders", icon: "▤" },
    { label: "Meja & QR", path: "/admin/tables", icon: "▣" },
    { label: "Promo", path: "/admin/promo", icon: "%" },
    { label: "Report", path: "/admin/report", icon: "↗" },
  ];

  return (
    <aside
      className="admin-sidebar"
      style={{
        width: "240px",
        height: "100vh",
        backgroundColor: "#211b1d",
        color: "#ffffff",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 9999,
        padding: "24px 16px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* LOGO / RESTORAN */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            backgroundColor: "#8f2638",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
          }}
        >
          HR
        </div>

        <div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "700",
            }}
          >
            Hoshi Ramen
          </div>

          <div
            style={{
              fontSize: "10px",
              opacity: 0.6,
              letterSpacing: "1px",
              marginTop: "3px",
            }}
          >
            ADMIN PANEL
          </div>
        </div>
      </div>

      {/* MAIN MENU */}

      <div
        style={{
          fontSize: "10px",
          fontWeight: "700",
          letterSpacing: "1.5px",
          opacity: 0.45,
          marginBottom: "10px",
        }}
      >
        MAIN MENU
      </div>

      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              color: "#ffffff",
              padding: "11px 12px",
              borderRadius: "8px",
              marginBottom: "5px",
              backgroundColor: isActive
                ? "#8f2638"
                : "transparent",
              opacity: isActive ? 1 : 0.75,
              fontSize: "14px",
              fontWeight: isActive ? "600" : "400",
            })}
          >
            <span
              style={{
                width: "24px",
                textAlign: "center",
                fontSize: "17px",
              }}
            >
              {item.icon}
            </span>

            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* SYSTEM */}

      <div
        style={{
          fontSize: "10px",
          fontWeight: "700",
          letterSpacing: "1.5px",
          opacity: 0.45,
          marginTop: "28px",
          marginBottom: "10px",
        }}
      >
        SYSTEM
      </div>

      <NavLink
        to="/admin/settings"
        style={({ isActive }) => ({
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textDecoration: "none",
          color: "#ffffff",
          padding: "11px 12px",
          borderRadius: "8px",
          backgroundColor: isActive
            ? "#8f2638"
            : "transparent",
          opacity: isActive ? 1 : 0.75,
          fontSize: "14px",
          fontWeight: isActive ? "600" : "400",
        })}
      >
        <span
          style={{
            width: "24px",
            textAlign: "center",
            fontSize: "17px",
          }}
        >
          ⚙
        </span>

        <span>Settings</span>
      </NavLink>

      {/* ADMIN PROFILE */}

      <div
        style={{
          position: "absolute",
          left: "16px",
          right: "16px",
          bottom: "20px",
          paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* FOTO PROFIL */}

          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#8f2638",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Foto profil admin"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span>
                {(profile.name || "Admin")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            )}
          </div>

          {/* NAMA ADMIN */}

          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {profile.name || "Admin"}
            </div>

            <div
              style={{
                fontSize: "11px",
                opacity: 0.5,
              }}
            >
              {profile.role || "Administrator"}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;