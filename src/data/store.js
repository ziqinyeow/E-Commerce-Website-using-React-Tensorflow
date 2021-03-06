const store = [
  {
    id: "store0001",
    key: "store0001",
    name: "Coach",
    url: "https://cdn.designrush.com/uploads/inspiration_images/7660/990__1513770583_731_coach1_7e6b6e6bb763.png",
    active: 5,
    joined: 2,
    follower: 5225,
    response: 99,
    passage: "The store name is Coach",
    messages: [
      {
        type: "bot",
        message: "Hello there",
        time: null,
      },
    ],
  },
  {
    id: "store0002",
    key: "store0002",
    name: "Charles & Keith",
    url: "https://s3-ap-southeast-1.amazonaws.com/s3.loopme.sg/img/newos/brands/2x/flIs4xEyQTZZNtHe.png",
    active: 4,
    joined: 1,
    follower: 4033,
    response: 99,
    passage: "",
    messages: [
      {
        type: "bot",
        message: "Hello there",
        time: null,
      },
    ],
  },
  {
    id: "store0003",
    key: "store0003",
    name: "Nike",
    url: "https://c.static-nike.com/a/images/w_1200,c_limit/bzl2wmsfh7kgdkufrrjq/seo-title.jpg",
    active: 2,
    joined: 2,
    follower: 10233,
    response: 98,
    passage: "",
    messages: [
      {
        type: "bot",
        message: "Hello there",
        time: null,
      },
    ],
  },
  {
    id: "store0004",
    key: "store0004",
    name: "Puma",
    url: "https://yt3.ggpht.com/ytc/AAUvwnhUMiynde2k_ntb827RsK4BTTEuMrnRqga4t12PGg=s900-c-k-c0x00ffffff-no-rj",
    active: 1,
    joined: 1,
    follower: 3203,
    response: 97,
    passage: "",
    messages: [
      {
        type: "bot",
        message: "Hello there",
        time: null,
      },
    ],
  },
  {
    id: "store0005",
    key: "store0005",
    name: "Under Armour",
    url: "https://about.underarmour.com/sites/default/files/styles/1600xauto/public/2020-04/Screen%20Shot%202020-04-01%20at%2010.55.41%20AM_3.png?itok=5JSPrp3M",
    active: 1,
    joined: 2,
    follower: 12033,
    response: 98,
    passage: "",
    messages: [
      {
        type: "bot",
        message: "Hello there",
        time: null,
      },
    ],
  },
  {
    id: "store0006",
    key: "store0006",
    name: "Zalora",
    url: "https://media-exp1.licdn.com/dms/image/C560BAQFfxR5rhSTrPQ/company-logo_200_200/0/1618203205735?e=2159024400&v=beta&t=ExhVDOd05QnhKNJDlW1CPZPj0GRsVSvKKpH3J3515Ck",
    active: 4,
    joined: 2,
    follower: 2029,
    response: 99,
    passage: "",
    messages: [
      {
        type: "bot",
        message: "Hello there",
        time: null,
      },
    ],
  },
  {
    id: "store0007",
    key: "store0007",
    name: "Adidas",
    url: "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg",
    active: 1,
    joined: 2,
    follower: 18209,
    response: 95,
    passage: "",
    messages: [
      {
        type: "bot",
        message: "Hello there",
        time: null,
      },
    ],
  },
  {
    id: "store0008",
    key: "store0008",
    name: "Molten",
    url: "https://cdn.worldvectorlogo.com/logos/molten-1.svg",
    active: 6,
    joined: 2,
    follower: 1320,
    response: 95,
    passage: "",
    messages: [
      {
        type: "bot",
        message: "Hello there",
        time: null,
      },
    ],
  },
  {
    id: "store0009",
    key: "store0009",
    name: "Samsung",
    url: "data:image/png;base64,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",
    active: 6,
    joined: 2,
    follower: 5320,
    response: 95,
    passage: "",
    messages: [
      {
        type: "bot",
        message: "Hello there",
        time: null,
      },
    ],
  },
  {
    id: "store0010",
    key: "store0010",
    name: "Hisense",
    url: "data:image/png;base64,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",
    active: 6,
    joined: 2,
    follower: 1320,
    response: 96,
    passage: "",
    messages: [
      {
        type: "bot",
        message: "Hello there",
        time: null,
      },
    ],
  },
  {
    id: "store0011",
    key: "store0011",
    name: "Sony",
    url: "https://www.sony.net/top/2017/img/icon/top-og.jpg",
    active: 2,
    joined: 1,
    follower: 10920,
    response: 96,
    passage: "",
    messages: [
      {
        type: "bot",
        message: "Hello there",
        time: null,
      },
    ],
  },
];

export default store;
