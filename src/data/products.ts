export interface Product {
  id: string;
  category: string;
  name: string;
  image: string;
}

export const categories = [
  "전체",
  "컬러A3복합기",
  "흑백A3복합기",
  "A4레이저복합기",
  "A4잉크젯",
  "디지털고속복사기",
  "스캐너"
];

export const productsData: Product[] = [
  { id: '1', category: '컬러A3복합기', name: '[A3 컬러] imageFORCE C7165', image: '/images/products/product-01.png' },
  { id: '2', category: '컬러A3복합기', name: '[A3 컬러] imageFORCE C5170', image: '/images/products/product-02.png' },
  { id: '3', category: '컬러A3복합기', name: '[A3 컬러] imageFORCE C3150', image: '/images/products/product-03.png' },
  { id: '4', category: '컬러A3복합기', name: '[A3 컬러] iR ADV DX C5850i', image: '/images/products/product-04.png' },
  { id: '5', category: '컬러A3복합기', name: '[A3 컬러] iR ADV DX C3926', image: '/images/products/product-05.png' },
  { id: '6', category: '흑백A3복합기', name: '[A3 흑백] iR ADV DX 4935', image: '/images/products/product-06.png' },
  { id: '7', category: '흑백A3복합기', name: '[A3 흑백] Apeos 3560', image: '/images/products/product-07.png' },
  { id: '8', category: 'A4잉크젯', name: '[A4 컬러] MAXIFY GX7192', image: '/images/products/product-08.png' },
  { id: '9', category: 'A4잉크젯', name: '[A4 컬러] MAXIFY GX6192', image: '/images/products/product-09.png' },
  { id: '10', category: 'A4레이저복합기', name: '[A4 흑백] MF469dw', image: '/images/products/product-10.png' },
  { id: '11', category: '스캐너', name: '[스캐너] CanoScan LiDE300', image: '/images/products/product-11.png' },
  { id: '12', category: '스캐너', name: '[스캐너] R30', image: '/images/products/product-12.png' },
  { id: '13', category: '스캐너', name: '[스캐너] DR-G2140', image: '/images/products/product-13.png' },
  { id: '14', category: '디지털고속복사기', name: '[디지털고속복사기] imagePRESS V700', image: '/images/products/product-14.png' },
  { id: '15', category: '디지털고속복사기', name: '[디지털고속복사기] varioPRINT iX1700', image: '/images/products/product-15.png' },
];
