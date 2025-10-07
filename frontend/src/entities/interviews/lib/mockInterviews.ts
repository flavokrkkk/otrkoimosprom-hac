import { Interview } from "../types/types";

export const mockInterviews: Interview[] = [
  {
    id: 1,
    post: "UX/UI Дизайнер",
    company: {
      id: "comp-001",
      name: "ВТБ",
      icon_url: "/images/company/vtb.png",
      industry: "FinTech",
      site_url: "https://www.vtb.ru",
    },
    candidate: "Даниил Хатунцев",
    date: "15.07.2025",
    status: "completed",
  },
  {
    id: 2,
    post: "Продуктовый Дизайнер",
    company: {
      id: "comp-002",
      name: "Почта Банк",
      icon_url: "/images/company/pochta.png",
      industry: "FinTech",
      site_url: "https://www.pochtabank.ru",
    },
    candidate: "Анастасия Иванова",
    date: "10.08.2025",
    status: "cancelled",
  },
  {
    id: 3,
    post: "Frontend разработчик",
    company: {
      id: "comp-003",
      name: "БМ-банк",
      icon_url: "/images/company/bm.png",
      industry: "FinTech",
      site_url: "https://www.bm-bank.ru/",
    },
    candidate: "Игорь Смирнов",
    date: "18.08.2025",
    status: "completed",
  },
  {
    id: 4,
    post: "Backend разработчик",
    company: {
      id: "comp-004",
      name: "ВТБ Лизинг",
      icon_url: "/images/company/vtb (2).png",
      industry: "Big Data",
      site_url: "https://www.vtb-leasing.ru",
    },
    candidate: "Екатерина Петрова",
    date: "05.06.2025",
    status: "cancelled",
  },
  {
    id: 5,
    post: "ML engineer",
    company: {
      id: "comp-005",
      name: "Саров бизнесбанк",
      icon_url: "/images/company/sarov.png",
      industry: "Робототехника",
      site_url: "https://sbb.bm-bank.ru",
    },
    candidate: "Алексей Кузнецов",
    date: "19.08.2025",
    status: "completed",
  },
];
