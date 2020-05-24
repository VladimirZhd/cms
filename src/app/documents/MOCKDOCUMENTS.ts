import { Document } from './document.model';

export const MOCKDOCUMENTS: Document[] = [
  {
    id: '1',
    name: 'CIT 425 - Data Warehousing',
    description: '',
    url: 'https://rkjdatawarehousing.wordpress.com/',
    children: [
      {
        id: '2',
        name: 'Project 1 – The Kimball Method',
        description: '',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-1-the-kimball-method/',
        children: []
      },
      {
        id: '3',
        name: 'Project 2 – Data warehouses vs. marts',
        description: '',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-2-data-warehouses-vs-marts/',
        children: []
      },
      {
        id: '4',
        name: 'Project 3 – The ETL Process',
        description: '',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-3-the-etl-process/',
        children: []
      },
      {
        id: '5',
        name: 'Project 4 – Modify the OLTP design',
        description: '',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-4-oltp-modifications-to-erp-design/',
        children: []
      },
      {
        id: '6',
        name: 'Project 5 – The OLAP design',
        description: '',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-4/',
        children: []
      },
      {
        id: '7',
        name: 'Project 6 – Transforming data',
        description: '',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/transforming-data/',
        children: []
      },
      {
        id: '8',
        name: 'Project 7 – MarkLogic',
        description: '',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-7-marklogic/',
        children: []
      },
      {
        id: '9',
        name: 'Project 8 – Build a web application',
        description: '',
        url: 'https://rkjdatawarehousing.wordpress.com/projects/project-8/',
        children: []
      }
    ]
  },
  {
    id: '10',
    name: 'CIT 460 - Enterprise Development',
    description: '',
    url: 'https://rkjackson.wordpress.com/',
    children: [
      { id: '12', name: 'Case 1 – Defining the requirements', description: '', url: 'https://rkjackson.wordpress.com/cases/case-1/', children: [] },
      { id: '13', name: 'Case 2 – User Interface design', description: '', url: 'https://rkjackson.wordpress.com/cases/case-2/', children: [] },
      {
        id: '14', name: 'Case 3 – Implementing Model Layer', description: '', url: 'https://rkjackson.wordpress.com/cases/case-3/',
        children: [
          { 'id': '36', name: 'Team Assignment', description: 'Create your first JavaBean class', url: '', children: [] }
          , { 'id': '37', name: 'Individual Assignment', description: 'Create remaining JavaBean classes', url: '', children: [] }
        ]
      },
      { id: '15', name: 'Case 4 – Enterprise Java Session Beans', description: '', url: 'https://rkjackson.wordpress.com/cases/case-4/', children: [] },
      { id: '16', name: 'Case 5 – Implementing the View', description: '', url: 'https://rkjackson.wordpress.com/cases/case-5/', children: [] },
      { id: '17', name: 'Case 6 – A Framework for the View Layer', description: '', url: 'https://rkjackson.wordpress.com/cases/case-6/', children: [] }
    ]
  },
  {
    id: '20',
    name: 'CIT 366 - Full Web Stack Development',
    description: '',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: [
      {
        'id': '21',
        'name': 'Lesson 1 - JavaScript Best Practices',
        description: '',
        'url': 'https://content.byui.edu/file/f0594919-9524-47eb-9f4d-5c7239c3c002/1/Lesson1Introduction.pdf',
        children: []
      },
      {
        'id': '22',
        'name': 'Lesson 2 - The DOM and JQuery',
        description: '',
        'url': 'https://content.byui.edu/file/c67e59fd-990c-4adc-9232-8027f847c8b9/1/Lesson2Introduction.pdf',
        children: []
      },
      {
        'id': '23',
        'name': 'Lesson 3 - Angular 2 Framework 1',
        description: '',
        'url': 'https://content.byui.edu/file/aa9b6af5-b882-48f5-8321-caca980e5ec9/1/Lesson3Introduction.pdf',
        children: []
      },
      {
        'id': '24',
        'name': 'Lesson 4 - Angular 2 Framework 2',
        description: '',
        'url': 'https://content.byui.edu/file/2c4ddd6c-dce4-408d-b581-f254a13e4d10/1/Lesson4Introduction.pdf',
        children: []
      },
      {
        'id': '25',
        'name': 'Lesson 5 - Angular 2 Framework 3',
        description: '',
        'url': 'https://content.byui.edu/file/66dc0765-22a7-4cd8-a184-942c607636fb/1/Lesson5Introduction.pdf',
        children: []
      }
    ]
  },
  {
    id: '40',
    name: 'CIT 366 - Full Web Stack Development',
    description: '',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: []
  },
  {
    id: '41',
    name: 'CIT 240 - Introduction to Networking',
    description: '',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: []
  },
  {
    id: '42',
    name: 'CIT 370 - Computer Security I',
    description: '',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: []
  },
  {
    id: '43',
    name: 'CIT 360 - Object Oriented Programming II',
    description: '',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: []
  },
  {
    id: '44',
    name: 'CIT 470 - Computer Security II',
    description: '',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: []
  },
  {
    id: '45',
    name: 'CIT 262 - Mobile Development',
    description: '',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: []
  },
  {
    id: '46',
    name: 'CIT 230 - Web Page Development',
    description: '',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: []
  },
  {
    id: '47',
    name: 'CIT 236 - Web Development',
    description: '',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: []
  },
  {
    id: '48',
    name: 'CIT 340 - Networking II',
    description: '',
    url: 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT 366 course description.pdf',
    children: []
  },
];
