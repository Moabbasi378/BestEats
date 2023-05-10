import {
  Facebook,
  Instagram,
  Mail,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";

export const Footer = () => {
  return (
    <div className="w-full border-t-2 h-[190px] bg-black">
      <div className="flex justify-evenly mt-5 font-bold text-white text-xl cursor-pointer">
        <p>Home</p>
        <p>About us</p>
        <p>Contact us</p>
        <p>Food</p>
        <p>Locations</p>
      </div>
      <div className="flex justify-center mt-10">
        <Facebook
          sx={{
            color: "white",
            fontSize: "3rem",
            mr: "4",
            cursor: "pointer",
          }}
        />
        <Instagram
          sx={{
            color: "white",
            fontSize: "3rem",
            mr: "4",
            cursor: "pointer",
          }}
        />
        <Mail
          sx={{
            color: "white",
            fontSize: "3rem",
            mr: "4",
            cursor: "pointer",
          }}
        />
        <WhatsApp
          sx={{
            color: "white",
            fontSize: "3rem",
            mr: "4",
            cursor: "pointer",
          }}
        />
        <Twitter
          sx={{
            color: "white",
            fontSize: "3rem",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};
