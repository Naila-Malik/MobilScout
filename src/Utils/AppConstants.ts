import {StackScreenProps} from '@react-navigation/stack';
import {Dimensions, Platform, PixelRatio, StatusBar} from 'react-native';
export const platformVersion = Platform.Version;
export type ScreenProps = StackScreenProps<any, any>;
export const ScreenSize = Dimensions.get('screen');
const templateWidth = 375;
const templateHeight = 812;
const widthRatio = ScreenSize.width / templateWidth;
const heightRatio = ScreenSize.height / templateHeight;
export const normalized = (value: number) =>
  PixelRatio.roundToNearestPixel(value * widthRatio);
export const hv = (value: number) =>
  PixelRatio.roundToNearestPixel(value * heightRatio);
export const horizontalScreenWithMargin = ScreenSize.width - normalized(48);
export const formFieldsHeight =
  Platform.OS == 'android' ? normalized(45) : normalized(50);
export const isSmallDevice = ScreenSize.height < 700 ? true : false;
export const maxDescriptionLength = 60;
export const maxImageSizeInBytes = 10 * 1024 * 1024; // 10MB

export const isAndroid = Platform.OS == 'android';

export const AppImages = {
  Auth: {
    // LogoImage: require('../Ui/assets/images/Auth/Logo.png'),
  },
};
export const AppFonts = {
  Synonyms: {
    Regular: 'Synonym-Regular',
    Medium: 'Synonym-Medium',
    SemiBold: 'Synonym-Semibold',
    Bold: 'Synonym-Bold',
    Light: 'Synonym-Light',
    ExtraLight: 'Synonym-Extralight',
  },
  Pally: {
    Regular: 'Pally-Regular',
    Medium: 'Pally-Medium',
    Bold: 'Pally-Bold',
  },
  Sans: {
    Light: 'UnitedSansReg-Light',
    Medium: 'UnitedSansReg-Medium',
    Black: 'UnitedSansReg-Black',
    Bold: 'UnitedSansReg-Bold',
    Heavy: 'UnitedSansReg-Heavy',
  },
};

export const AppColors = {
  dark: {},
  transparentColor: 'rgba(0,0,0,0.5)',
  transparentColorLight: 'rgba(0,0,0,0.3)',
  white: {
    white: '#ffffff',
    whiteOp: '#E8E8E8',
  },
  black: {
    black: '#1E293B',
    lighter: '#475569',
    deepBlack: '#000000',
  },
  grey: {
    grey: '#6B7280',
    greyLight: '#E5E7EB',
    lighter: '#F1F5F9',
    lighterLvl2: '#94A3B8',
    borderGrey: '#E2E8F0',
    grey_dim: '#F6F7FB',
    gre_dimLvl2: '#64748B',
    greyLightest: '#F8FAFC',
    otpGrey: '#4B5563',
    dotGrey: '#9CA3AF',
  },
  red: {
    warning: '#E35252',
    fontRed: '#EF4444',
    red_dim: '#FEF2F2',
    drawerRedPrimary: '#CA3A31',
    drawerRedSecondary: '#FCF2F2',
  },
  green: {
    primaryLight: '#76E2C6',
    primaryLightButton: '#57dbba',
    drawerLightGreenPrimary: '#73A132',
    drawerLightGreenSecondary: '#F8FEE9',
    drawerGreenPrimary: '#43946C',
    drawerGreenSecondary: '#EFFCF5',
    lightestGreen: '#F0FDFA',
    parrotGreen: '#F9FEEB',
    dotGreen: '#0D9488',
    dotParrot: '#7D9F44',
    borderLightGreen: '#C9F078',
    msgDotGreen: '#40D471',
  },
  blue: {
    mainBlue: '#0055DF',
    lighterBlue: '#E8EBFB',
    drawerTealBluePrimary: '#418FAE',
    drawerTealBlueSecondary: '#EFFDFF',
    drawerBluePrimary: '#3662E3',
    drawerBlueSecondary: '#F0F6FE',
    blueGreyish: '#002a6f',
  },
  brown: {
    drawerBrownPrimary: '#CC7C2E',
    drawerBrownSecondary: '#FEFBED',
    pale: '#FFFBEB',
    dotBrown: '#D97706',
    brownLighter: '#FDE68A',
    bgBrownLighter: '#fefbea',
  },
  purple: {
    drawerPurplePrimary: '#743EE4',
    drawerPurpleSecondary: '#F5F3FE',
    lightPurple: '#C4CCF6',
    darkPurple: '#6F8BEA',
  },
  Maroon: {
    drawerMaroonPrimary: '#CF364C',
    drawerMaroonSecondary: '#FDF1F2',
  },
  indigo: {
    lighter: '#F7F3FF',
    dotIndigo: '#955CF6',
  },
  yellow: {
    selectedDayYellow: '#FFAB00',
  },
  pink: {
    drawerPinkPrimary: '#B135CC',
    drawerPinkSecondary: '#FDF1F2',
  },
};

export const randomColors: any = {
  green: {
    primaryColor: '#F0FDFA',
    secondaryColor: '#0D9488',
  },
  brown: {
    primaryColor: '#FFFBEB',
    secondaryColor: '#D97706',
  },
  parrot: {
    primaryColor: '#F9FEEB',
    secondaryColor: '#7D9F44',
  },
  indigo: {
    primaryColor: '#F7F3FF',
    secondaryColor: '#955CF6',
  },
};

export const noticeColorsList: any = [
  {
    primaryColor: '#F0FDFA',
    secondaryColor: '#0D9488',
  },
  {
    primaryColor: '#FFFBEB',
    secondaryColor: '#D97706',
  },
  {
    primaryColor: '#F9FEEB',
    secondaryColor: '#7D9F44',
  },
  {
    primaryColor: '#F7F3FF',
    secondaryColor: '#955CF6',
  },
];

export const classTimeTableColorsList: any = [
  {
    primaryColor: '#F0FDFA',
    secondaryColor: '#0D9488',
  },
  {
    primaryColor: '#FFFBEB',
    secondaryColor: '#D97706',
  },
  {
    primaryColor: '#F9FEEB',
    secondaryColor: '#7D9F44',
  },
  {
    primaryColor: '#F7F3FF',
    secondaryColor: '#955CF6',
  },
];

export const getSingleNoticeObjWithColor = (item: any) => {
  const eventType: 'academic' | 'operational' | 'activity' =
    item?.eventType?.toLowerCase();
  const colorIndex =
    eventType == 'academic'
      ? 0
      : eventType == 'activity'
      ? 1
      : eventType == 'operational'
      ? 3
      : 2;
  return {
    ...item,
    ...noticeColorsList[colorIndex],
  };
};

export const getRandomColorObj = () => {
  const colorKeys = Object.keys(randomColors);
  const randomIndex = Math.floor(Math.random() * colorKeys.length);
  const randomColorKey = colorKeys[randomIndex];
  return randomColors[randomColorKey];
};

const classTimeTableRandomColorsList = [
  {
    textColor: '#D97706',
    primaryColor: '#FFFBEB',
    secondaryColor: '#FDE68A',
  },
  {
    textColor: '#73A132',
    secondaryColor: '#C9F078',
    primaryColor: '#F8FEE9',
  },
  {
    textColor: '#439288',
    secondaryColor: '#B8F1D2',
    primaryColor: '#EFFCF5',
  },
  {
    textColor: '#3982C2',
    secondaryColor: '#B6F1FA',
    primaryColor: '#EFFDFF',
  },
  {
    textColor: '#3662E3',
    secondaryColor: '#C4DAFB',
    primaryColor: '#F0F6FE',
  },
  {
    textColor: '#B135CC',
    secondaryColor: '#B135CC',
    primaryColor: '#FBF4FE',
  },
];

export const getSingleClassTimetableObjWithColor = (item: any) => {
  type typeOfSubject =
    | 'mathematics'
    | 'biology'
    | 'organic chemistry'
    | 'environmental science'
    | 'science'
    | 'english';
  const subjectName: typeOfSubject = item?.subject?.name?.toLowerCase();
  console.log('subjectName: ', subjectName);
  const colorIndex =
    subjectName == 'mathematics'
      ? 0
      : subjectName == 'biology'
      ? 1
      : subjectName == 'organic chemistry'
      ? 2
      : subjectName == 'environmental science'
      ? 3
      : subjectName == 'science'
      ? 4
      : 5;
  console.log('colorIndex: ', classTimeTableRandomColorsList[colorIndex]);
  return {
    ...item,
    ...classTimeTableRandomColorsList[colorIndex],
  };
};

export const headerChildList = [
  {
    id: 1,
    title: 'Jane Marry',
    school: 'Carnegie Vanguard High School',
  },
  {
    id: 2,
    title: 'Theresa Webb',
    school: 'Sapphire International School',
  },
  {
    id: 3,
    title: 'Arlene McCoy',
    school: 'Delhi Public School',
  },
];
export const dashboardTabList = [
  {
    index: 1,
    title: 'General',
  },
  {
    index: 2,
    title: 'Your Child',
  },
];
export const AppointmentTabList = [
  {
    index: 1,
    title: 'Upcoming',
  },
  {
    index: 2,
    title: 'Archived',
  },
];

export const CalendarList = [
  {
    date: '15th Aug 2023',
    list: [
      {
        id: 1,
        category: 'Academic',
        title: 'Alert! final terms are starting in 10 days, good luck!',
        detail:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
        primaryColor: AppColors.green.lightestGreen,
        secondaryColor: AppColors.green.dotGreen,
        time: '07:38 am',
      },
      {
        id: 2,
        category: 'Operational',
        title: 'School vacation holiday staring next week for 2 weeks.',
        detail:
          'School vacation holiday staring next week for 2 weeks. School vacation holiday staring next week for 2 weeks. School vacation holiday staring next week for 2 weeks.',
        primaryColor: AppColors.indigo.lighter,
        secondaryColor: AppColors.indigo.dotIndigo,
        time: '07:38 am',
      },
      {
        id: 3,
        category: 'Activity',
        title:
          'Good news! school is organising ballet and karate competition, register yourself before seats get over.',
        detail:
          'School vacation holiday staring next week for 2 weeks. School vacation holiday staring next week for 2 weeks. School vacation holiday staring next week for 2 weeks.',
        primaryColor: AppColors.brown.pale,
        secondaryColor: AppColors.brown.dotBrown,
        time: '07:38 am',
      },
      {
        id: 4,
        category: 'Operational',
        title:
          'Good news! school is organising ballet and karate competition, register yourself before seats get over.',
        detail:
          'School vacation holiday staring next week for 2 weeks. School vacation holiday staring next week for 2 weeks. School vacation holiday staring next week for 2 weeks.',
        primaryColor: AppColors.indigo.lighter,
        secondaryColor: AppColors.indigo.dotIndigo,
        time: '07:38 am',
      },
      {
        id: 5,
        category: 'Academic',
        title:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillu',
        detail:
          'School vacation holiday staring next week for 2 weeks. School vacation holiday staring next week for 2 weeks. School vacation holiday staring next week for 2 weeks.',
        primaryColor: AppColors.green.lightestGreen,
        secondaryColor: AppColors.green.dotGreen,
        time: '07:38 am',
      },
      {
        id: 6,
        category: 'Activity',
        title:
          'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse qua',
        detail:
          'School vacation holiday staring next week for 2 weeks. School vacation holiday staring next week for 2 weeks. School vacation holiday staring next week for 2 weeks.',
        primaryColor: AppColors.brown.pale,
        secondaryColor: AppColors.brown.dotBrown,
        time: '07:38 am',
      },
    ],
  },
];

export const timeSlots = [
  {
    id: 1,
    time: '09: 00 AM',
    blocked: false,
  },
  {
    id: 2,
    time: '09: 15 AM',
    blocked: false,
  },
  {
    id: 3,
    time: '09: 30 AM',
    blocked: false,
  },
  {
    id: 4,
    time: '09: 45 AM',
    blocked: true,
  },
  {
    id: 5,
    time: '10: 00 AM',
    blocked: false,
  },
  {
    id: 6,
    time: '10: 15 AM',
    blocked: false,
  },
  {
    id: 7,
    time: '10: 30 AM',
    blocked: true,
  },
  {
    id: 8,
    time: '10: 45 AM',
    blocked: false,
  },
  {
    id: 9,
    time: '11: 00 AM',
    blocked: false,
  },
  {
    id: 10,
    time: '11: 15 AM',
    blocked: false,
  },
  {
    id: 11,
    time: '11: 30 AM',
    blocked: false,
  },
  {
    id: 12,
    time: '11: 45 AM',
    blocked: true,
  },
  {
    id: 13,
    time: '12: 00 PM',
    blocked: false,
  },
];

export const appointmentMeetingTypeList = [
  {
    id: 1,
    name: 'Phone Call',
  },
  {
    id: 2,
    name: 'In Personal Meeting',
  },
  {
    id: 3,
    name: 'Video Call',
  },
];

export const galleryTabList = [
  {
    index: 1,
    title: 'School Gallery',
  },
  {
    index: 2,
    title: 'Child Gallery',
  },
];

export const galleryTempList = [
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/5325009/pexels-photo-5325009.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/4307852/pexels-photo-4307852.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/4792718/pexels-photo-4792718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    mediaType: 'video',
    mediaUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    mediaType: 'video',
    mediaUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    mediaType: 'video',
    mediaUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/5473883/pexels-photo-5473883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/5588207/pexels-photo-5588207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    mediaType: 'video',
    mediaUrl:
      'https://file-examples.com/storage/fe235481fb64f1ca49a92b5/2017/04/file_example_MP4_480_1_5MG.mp4',
  },
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/5588370/pexels-photo-5588370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/5589359/pexels-photo-5589359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    mediaType: 'video',
    mediaUrl:
      'https://file-examples.com/storage/fe235481fb64f1ca49a92b5/2017/04/file_example_MP4_1920_18MG.mp4',
  },
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/5950171/pexels-photo-5950171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/6833569/pexels-photo-6833569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/7241639/pexels-photo-7241639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/5076509/pexels-photo-5076509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    mediaType: 'video',
    mediaUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    mediaType: 'video',
    mediaUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
];

export const testGalleryDescription =
  'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet more. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet more. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet more. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet more.';
export const MsgAcademicList = [
  {
    id: 1,
    sender: 'Brooklyn Simmons',
    detail:
      'However rare side effects observed among children can be metabolic acidosis, coma, respiratory depression, and hypoglycemia-',
    time: '2023-09-13 03:00:00',
    unread: 12,
    online: true,
  },
  {
    id: 2,
    sender: 'Jacob Jones',
    detail:
      'However rare side effects observed among children can be metabolic acidosis, coma, respiratory depression, and hypoglycemia-',
    time: '2023-09-14 05:00:00',
    unread: 6,
    online: true,
  },
  {
    id: 3,
    sender: 'Floyd Miles',
    detail:
      'However rare side effects observed among children can be metabolic acidosis, coma, respiratory depression, and hypoglycemia-',
    time: '2023-09-13 07:00:00',
    unread: null,
    online: false,
  },
  {
    id: 4,
    sender: 'Jane Cooper',
    detail:
      'However rare side effects observed among children can be metabolic acidosis, coma, respiratory depression, and hypoglycemia-',
    time: '2023-09-12 04:00:00',
    unread: 17,
    online: true,
  },
  {
    id: 5,
    sender: 'Theresa Webb',
    detail:
      'However rare side effects observed among children can be metabolic acidosis, coma, respiratory depression, and hypoglycemia-',
    time: '2023-09-13 07:00:00',
    unread: 1,
    online: false,
  },
  {
    id: 6,
    sender: 'Cody Fisher',
    detail:
      'However rare side effects observed among children can be metabolic acidosis, coma, respiratory depression, and hypoglycemia-',
    time: '2023-09-13 08:00:00',
    unread: 5,
    online: true,
  },
  {
    id: 7,
    sender: 'Kathryn Murphy',
    detail:
      'However rare side effects observed among children can be metabolic acidosis, coma, respiratory depression, and hypoglycemia-',
    time: '2023-09-12 07:00:00',
    unread: null,
    online: false,
  },
];

export const isYouTubeVideo = (url: string) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
};

export const messageList = [
  {
    date: '2023-09-12 11:30',
    data: [
      {
        time: '10:03:13',
        isMine: 'false',
        content: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu`,
      },
      {
        time: '10:03:13',
        isMine: 'true',
        content:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco la',
      },
      {
        time: '10:03:13',
        isMine: 'true',
        content: 'Lorem ipsum dolor sit amet, ',
      },
      {
        time: '10:03:13',
        isMine: 'true',
        content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur ',
      },
    ],
  },
  {
    date: '2023-09-13 10:15',
    data: [
      {
        time: '10:03:13',
        isMine: 'false',
        content: `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es`,
      },
      {
        time: '10:03:13',
        isMine: 'false',
        content:
          'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed qu',
      },
    ],
  },
];

export const TeachersList = [
  {
    id: 1,
    name: 'Black Marvin',
    subject: 'Handwork or handcrafts',
    class: '10th',
    about:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma',
  },
  {
    id: 2,
    name: 'Kristin Watson',
    subject: 'Life Lab or gardening',
    class: '10th',
    about:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma',
  },
  {
    id: 3,
    name: 'Jenny Wilson',
    subject: 'Language',
    class: '10th',
    about:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma',
  },
  {
    id: 4,
    name: 'Cameron Williamson',
    subject: 'Music',
    class: '10th',
    about:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma',
  },
  {
    id: 5,
    name: 'Ronald Richards',
    subject: 'Science',
    class: '10th',
    about:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma',
  },
  {
    id: 6,
    name: 'Devon Lane',
    subject: 'Adaptive P.E.',
    class: '10th',
    about:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma',
  },
  {
    id: 7,
    name: 'Darlene Robertson',
    subject: 'Mathematics',
    class: '10th',
    about:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma',
  },
  {
    id: 8,
    name: 'Black Marvin',
    subject: 'Dramatics',
    class: '10th',
    about:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma',
  },
  {
    id: 9,
    name: 'Kristin Watson',
    subject: 'Dramatics',
    class: '10th',
    about:
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur ma',
  },
];

export const notificationsList = [
  {
    date: '2023-09-22 11:30',
    data: [
      {
        time: '10:03:13',
        type: 'appointement',
        notifi: 'Your appointment has been scheduled for 10th July 2023.',
      },
      {
        time: '11:03:13',
        type: 'assignment',
        notifi: 'New assignment has been update by John Doe',
      },
      {
        time: '09:03:13',
        type: 'appointement',
        notifi: 'Your appointment has been scheduled for 10th July 2023.',
      },
    ],
  },
  {
    date: '2023-09-20 10:15',
    data: [
      {
        time: '12:03:13',
        type: 'appointement',
        notifi: 'Your appointment has been scheduled for 10th July 2023.',
      },
      {
        time: '08:03:13',
        type: 'calendar',
        notifi: `School closing time updates`,
      },
      {
        time: '10:03:13',
        type: 'assignment',
        notifi: 'New assignment has been update by John Doe',
      },
    ],
  },
  {
    date: '2023-09-18 10:15',
    data: [
      {
        time: '13:03:13',
        type: 'assignment',
        notifi: 'New assignment has been update by John Doe',
      },
      {
        time: '10:03:13',
        type: 'appointement',
        notifi: 'Your appointment has been scheduled for 10th July 2023.',
      },
      {
        time: '09:03:13',
        type: 'calendar',
        notifi: 'School closing time updates',
      },
      {
        time: '07:03:13',
        type: 'assignment',
        notifi: 'New assignment has been update by John Doe',
      },
    ],
  },
  {
    date: '2023-09-13 10:15',
    data: [
      {
        time: '13:03:13',
        type: 'assignment',
        notifi: 'New assignment has been update by John Doe',
      },
      {
        time: '10:03:13',
        type: 'appointement',
        notifi: 'Your appointment has been scheduled for 10th July 2023.',
      },
      {
        time: '09:03:13',
        type: 'calendar',
        notifi: 'School closing time updates',
      },
      {
        time: '07:03:13',
        type: 'assignment',
        notifi: 'New assignment has been update by John Doe',
      },
    ],
  },
];
