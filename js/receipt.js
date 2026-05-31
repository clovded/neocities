// ── Config ──
const CONFIG = {
  locale: 'en-US',
  storeName: 'cloud mart',
  orderPrefix: 'ORDER #',
  colHeaderQty: 'QTY',
  colHeaderItem: 'ITEM',
  itemCountLabel: 'ITEM COUNT:',
  authCodeLabel: 'AUTH CODE:',
  sourceLabel: 'SOURCE:',
  unknownSource: 'UNKNOWN',
  footer: 'thank you for visiting!',
};

// ── Data ──
const BARCODE = `<svg class="receipt-barcode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" preserveAspectRatio="none">
  <rect x="2"   width="2" height="40"/>
  <rect x="7"   width="1" height="40"/>
  <rect x="10"  width="3" height="40"/>
  <rect x="14"  width="1" height="40"/>
  <rect x="18"  width="2" height="40"/>
  <rect x="22"  width="3" height="40"/>
  <rect x="26"  width="1" height="40"/>
  <rect x="29"  width="2" height="40"/>
  <rect x="34"  width="1" height="40"/>
  <rect x="36"  width="3" height="40"/>
  <rect x="41"  width="2" height="40"/>
  <rect x="44"  width="1" height="40"/>
  <rect x="48"  width="2" height="40"/>
  <rect x="52"  width="3" height="40"/>
  <rect x="56"  width="1" height="40"/>
  <rect x="59"  width="2" height="40"/>
  <rect x="64"  width="3" height="40"/>
  <rect x="68"  width="1" height="40"/>
  <rect x="71"  width="2" height="40"/>
  <rect x="74"  width="3" height="40"/>
  <rect x="80"  width="1" height="40"/>
  <rect x="83"  width="2" height="40"/>
  <rect x="86"  width="3" height="40"/>
  <rect x="91"  width="1" height="40"/>
  <rect x="93"  width="2" height="40"/>
  <rect x="98"  width="3" height="40"/>
  <rect x="103" width="1" height="40"/>
  <rect x="105" width="2" height="40"/>
  <rect x="109" width="1" height="40"/>
  <rect x="113" width="3" height="40"/>
  <rect x="117" width="2" height="40"/>
  <rect x="121" width="1" height="40"/>
  <rect x="123" width="3" height="40"/>
  <rect x="128" width="2" height="40"/>
  <rect x="133" width="1" height="40"/>
  <rect x="135" width="3" height="40"/>
  <rect x="140" width="1" height="40"/>
  <rect x="142" width="2" height="40"/>
  <rect x="147" width="3" height="40"/>
  <rect x="151" width="1" height="40"/>
  <rect x="154" width="2" height="40"/>
  <rect x="158" width="3" height="40"/>
  <rect x="164" width="1" height="40"/>
  <rect x="166" width="2" height="40"/>
  <rect x="170" width="3" height="40"/>
  <rect x="174" width="1" height="40"/>
  <rect x="178" width="2" height="40"/>
  <rect x="182" width="3" height="40"/>
  <rect x="186" width="1" height="40"/>
  <rect x="189" width="2" height="40"/>
  <rect x="192" width="3" height="40"/>
  <rect x="197" width="2" height="40"/>
</svg>`;

// ── Logic ──
const zeroPad = n => String(n).padStart(2, '0');

const formatLongDate = dateString => {
  const [month, day, year] = dateString.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  const dayName = date.toLocaleDateString(CONFIG.locale, { weekday: 'long' }).toUpperCase();
  const monthName = date.toLocaleDateString(CONFIG.locale, { month: 'long' }).toUpperCase();
  return `${dayName}, ${monthName} ${day}, ${year}`;
};

const buildBarcodeNumber = index =>
  `${index + 2} 0${index}423 00${String(index + 1).padStart(3, '0')} ${(index * 3 + 6) % 10}`;

const buildReceiptData = (quote, index) => ({
  orderNumber: zeroPad(index + 1),
  formattedDate: formatLongDate(quote.date),
  authCode: quote.date.replace(/\//g, '').slice(0, 6),
  source: quote.author ?? CONFIG.unknownSource,
  note: quote.note ?? '',
  barcodeNumber: buildBarcodeNumber(index),
  text: quote.text,
});

// ── Render ──
export const renderReceipt = (quote, index) => {
  const { orderNumber, formattedDate, authCode, source, note, barcodeNumber, text } =
    buildReceiptData(quote, index);

  return `
    <div class="receipt">
      <div class="receipt-top-edge"></div>
      <div class="receipt-body">
        <div class="receipt-store">${CONFIG.storeName}</div>
        <hr class="receipt-divider rule">
        <div class="receipt-order">${CONFIG.orderPrefix}${orderNumber}</div>
        <div class="receipt-date">${formattedDate}</div>
        <hr class="receipt-divider rule">
        <div class="receipt-col-header"><span>${CONFIG.colHeaderQty}</span><span>${CONFIG.colHeaderItem}</span></div>
        <hr class="receipt-divider rule">
        <div class="receipt-item-row">
          <span class="receipt-qty">${orderNumber}</span>
          <span class="receipt-quote">${text}</span>
        </div>
        <hr class="receipt-divider rule">
        <div class="receipt-summary-row"><span>${CONFIG.itemCountLabel}</span><span>1</span></div>
        <hr class="receipt-divider rule">
        <div class="receipt-payment">
          ${CONFIG.authCodeLabel} ${authCode}<br>
          ${CONFIG.sourceLabel} ${source}<br>
          ${note}
        </div>
        <div class="receipt-footer">${CONFIG.footer}</div>
        ${BARCODE}
        <div class="receipt-barcode-num">${barcodeNumber}</div>
      </div>
      <div class="receipt-bottom-edge"></div>
    </div>`;
};
