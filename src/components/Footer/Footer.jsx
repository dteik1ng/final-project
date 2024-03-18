import "./FooterStyle.css";
import { Link } from "react-router-dom";
import LogoBlanco from "../../assets/img/LogoBlanco.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  const footerDetails = {
    year: new Date().getFullYear(),
    nameproject: "BarrelGlow",
  };
  return (
    <footer>
      {/* Terminos y condiciones de la izquierda */}

      <div className="footer-left">
        <p>
          @{footerDetails.year} {footerDetails.nameproject}, Project
        </p>
        <p className="separator">|</p>
        <p>
          <Link to="">Términos y Condiciones</Link>
        </p>
      </div>

      {/* Logo del centro */}

      <img src={LogoBlanco} alt="Logo" className="logo" />

      {/* iconos de la derecha */}

      <div className="footer-right">
      <Link to="https://www.facebook.com/profile.php?id=61557507350610&viewas=&show_switched_toast=false&show_switched_tooltip=false&is_tour_dismissed=false&is_tour_completed=false&show_podcast_settings=false&show_community_review_changes=false&should_open_composer=false&badge_type=NEW_MEMBER&show_community_rollback_toast=false&show_community_rollback=false&show_follower_visibility_disclosure=false&bypass_exit_warning=true" target="_blank">
        <FaFacebook className="social-icon" />
        </Link>
        <Link to="https://www.instagram.com/barrelglow/" target="_blank">
        <FaInstagram className="social-icon" />
        </Link>
        <Link to="https://twitter.com/Barrelglow4928" target="_blank">
        <FaTwitter className="social-icon" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
