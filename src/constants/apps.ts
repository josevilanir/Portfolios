export const ICON_CDN = 'https://cdn.jim-nielsen.com/macos/1024';

export type AppConfig = {
  id: string;
  labelPt: string;
  labelEn: string;
  icon: string;
  type: 'app' | 'download';
  href?: string;
};

export const ALL_APPS: AppConfig[] = [
  {
    id: 'about',
    labelPt: 'Sobre Mim',
    labelEn: 'About Me',
    icon: `${ICON_CDN}/photos-2021-05-28.png`,
    type: 'app'
  },
  {
    id: 'projects',
    labelPt: 'Projetos',
    labelEn: 'Projects',
    icon: `${ICON_CDN}/finder-2021-09-10.png`,
    type: 'app'
  },
  {
    id: 'terminal',
    labelPt: 'Terminal',
    labelEn: 'Terminal',
    icon: `${ICON_CDN}/terminal-2021-06-03.png`,
    type: 'app'
  },
  {
    id: 'skills',
    labelPt: 'Skills',
    labelEn: 'Skills',
    icon: `${ICON_CDN}/notes-2021-05-25.png`,
    type: 'app'
  },
  {
    id: 'contact',
    labelPt: 'Contato',
    labelEn: 'Contact',
    icon: `${ICON_CDN}/mail-2021-05-25.png`,
    type: 'app'
  },
  {
    id: 'resume',
    labelPt: 'Currículo',
    labelEn: 'Resume',
    icon: `https://cdn.jim-nielsen.com/macos/1024/textedit-2021-06-03.png`,
    type: 'download',
    href: '/Curriculum_FINAL_Polido.pdf'
  },
  {
    id: 'browser',
    labelPt: 'Browser',
    labelEn: 'Browser',
    icon: `https://cdn.jim-nielsen.com/macos/1024/safari-2021-06-02.png`,
    type: 'app'
  }
];

export const DOCK_APP_IDS = ['about', 'projects', 'terminal', 'skills', 'contact'];
export const DESKTOP_APP_IDS = ['about', 'projects', 'skills', 'terminal', 'resume'];
