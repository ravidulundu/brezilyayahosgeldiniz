import {
  BriefcaseBusiness,
  Facebook,
  Globe2,
  Instagram,
  Languages,
  Linkedin,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Plane,
  Send,
  ShieldCheck,
  Twitter,
  Users,
  X,
} from "lucide-react";

const icons = {
  BriefcaseBusiness,
  Facebook,
  Globe2,
  Instagram,
  Languages,
  Linkedin,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Plane,
  Send,
  ShieldCheck,
  Twitter,
  Users,
  X,
};

export default function Icon({ name, size = 22, className = "" }) {
  const LucideIcon = icons[name] ?? Globe2;

  return <LucideIcon size={size} className={className} strokeWidth={1.9} aria-hidden="true" />;
}
