import {
    FiCoffee,
    FiCode,
    FiCodepen,
    FiFacebook,
    FiGithub,
    FiGlobe,
    FiHeart,
    FiLinkedin,
    FiMail,
    FiStar,
    FiYoutube,
} from "react-icons/fi";
import styles from "./styles.module.css";

const footerLinks = [
    { label: "Portfolio", href: "https://www.ashishranjan.net", icon: FiGlobe },
    { label: "GitHub", href: "https://github.com/a2rp", icon: FiGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", icon: FiCodepen },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aashishranjan",
        icon: FiLinkedin,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/theash.ashish/",
        icon: FiFacebook,
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1",
        icon: FiYoutube,
    },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: FiMail },
    {
        label: "Support",
        href: "https://a2rp-donation-page.netlify.app/",
        icon: FiHeart,
    },
    {
        label: "Buy Me a Coffee",
        href: "https://buymeacoffee.com/ashishranjan",
        icon: FiCoffee,
    },
    {
        label: "Patreon",
        href: "https://www.patreon.com/ashishranjan",
        icon: FiStar,
    },
    {
        label: "Source code",
        href: "https://github.com/a2rp/design-token-editor",
        icon: FiCode,
    },
];

const SiteFooter = () => {
    return (
        <footer className={styles.siteFooter}>
            <div className={styles.footerInner}>
                <div className={styles.footerIdentity}>
                    <a
                        className={styles.logoLink}
                        href="https://www.ashishranjan.net"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={import.meta.env.BASE_URL + "logo.png"}
                            alt="Ashish Ranjan portfolio"
                            width="38"
                            height="38"
                        />
                    </a>
                    <p>
                        © {new Date().getFullYear()}{" "}
                        <a
                            href="https://github.com/a2rp"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Ashish Ranjan
                        </a>
                        . All rights reserved.
                    </p>
                </div>
                <nav
                    className={styles.footerLinks}
                    aria-label="Profile and support links"
                >
                    {footerLinks.map(({ label, href, icon: Icon }) => (
                        <a
                            className={styles.footerLink}
                            href={href}
                            key={label}
                            target={
                                href.startsWith("mailto:")
                                    ? undefined
                                    : "_blank"
                            }
                            rel={
                                href.startsWith("mailto:")
                                    ? undefined
                                    : "noreferrer"
                            }
                        >
                            <Icon aria-hidden="true" />
                            <span>{label}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
};

export default SiteFooter;
