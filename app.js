/**
 * Ambulance Equipment Inspection System - Cho-airong Hospital
 * Vehicle 1 (Refer), Vehicle 2 (EMS), Vehicle 3, Vehicle 4
 * 78 Items Equipment Checklist Across 8 Categories
 * Ultra-Fast Optimistic UI + Firestore Offline Persistence
 */

// Active Firebase Configuration Credentials
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAqIAQGqXd2HLGHRifwHEGxQpyGX0C2R0w",
  authDomain: "ambulance-cir.firebaseapp.com",
  databaseURL: "https://ambulance-cir-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ambulance-cir",
  storageBucket: "ambulance-cir.firebasestorage.app",
  messagingSenderId: "459668705831",
  appId: "1:459668705831:web:adddd263f67bed3e45f402",
  measurementId: "G-D2SHVCZG1F"
};

// Category Meta Definitions
const CATEGORIES_META = {
  'airway-breathing': { name: 'Airway & Breathing', icon: 'fa-lungs' },
  'circulation': { name: 'Circulation', icon: 'fa-heart-pulse' },
  'iv-kit': { name: 'ชุดอุปกรณ์ให้ IV', icon: 'fa-droplet' },
  'injection-kit': { name: 'ชุดอุปกรณ์ฉีดยา', icon: 'fa-syringe' },
  'splint-moving': { name: 'อุปกรณ์ดาม & ยกเคลื่อนย้าย', icon: 'fa-bed-pulse' },
  'ppe': { name: 'ชุด PPE', icon: 'fa-head-side-mask' },
  'safety': { name: 'Safety', icon: 'fa-shield-halved' },
  'other': { name: 'อุปกรณ์อื่นๆ ทั่วไป', icon: 'fa-box-archive' }
};

// Complete 78 Equipment Items Master List
const CHECKLIST_ITEMS_78 = [
  // 1. Airway & Breathing (14 items)
  { num: 1, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'ambu-child', name: 'Ambu เด็ก' },
  { num: 2, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'ambu-adult', name: 'Ambu ผู้ใหญ่' },
  { num: 3, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'o2-mask-child', name: 'O2 mask เด็ก' },
  { num: 4, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'o2-mask-adult', name: 'O2 mask ผู้ใหญ่' },
  { num: 5, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'o2-cannular', name: 'O2 cannular' },
  { num: 6, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'nebulizer-set-child', name: 'set พ่นยา เด็ก' },
  { num: 7, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'nebulizer-set-adult', name: 'set พ่นยา ผู้ใหญ่' },
  { num: 8, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'rubber-bulb-syringe', name: 'ลูกสูบยางแดง' },
  { num: 9, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'stethoscope', name: 'stethoscope' },
  { num: 10, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'oral-airway', name: 'oral airway ขนาดต่างๆ' },
  { num: 11, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'nasal-airway', name: 'nasal airway ขนาดต่างๆ' },
  { num: 12, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'ky-jelly', name: 'KY jelly' },
  { num: 13, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'oxygen-tank-1', name: 'Oxygen ถังที่ 1' },
  { num: 14, catId: 'airway-breathing', catName: 'Airway & Breathing', id: 'oxygen-tank-2', name: 'Oxygen ถังที่ 2' },

  // 2. Circulation (16 items)
  { num: 15, catId: 'circulation', catName: 'Circulation', id: 'nss-1000', name: 'NSS 1000 ml.' },
  { num: 16, catId: 'circulation', catName: 'Circulation', id: '5dn2-1000', name: '5%D/N/2 1000 ml.' },
  { num: 17, catId: 'circulation', catName: 'Circulation', id: 'aed', name: 'AED' },
  { num: 18, catId: 'circulation', catName: 'Circulation', id: 'paddle-child', name: 'Paddle เด็ก' },
  { num: 19, catId: 'circulation', catName: 'Circulation', id: 'paddle-adult', name: 'Paddle ผู้ใหญ่' },
  { num: 20, catId: 'circulation', catName: 'Circulation', id: 'electrode-adult', name: 'แผ่น Electrode ผู้ใหญ่' },
  { num: 21, catId: 'circulation', catName: 'Circulation', id: 'electrode-child', name: 'แผ่น Electrode เด็ก' },
  { num: 22, catId: 'circulation', catName: 'Circulation', id: 'bp-digital', name: 'เครื่องวัด BP Digital' },
  { num: 23, catId: 'circulation', catName: 'Circulation', id: 'o2-sat', name: 'เครื่องวัด O2 sat' },
  { num: 24, catId: 'circulation', catName: 'Circulation', id: 'top-gauze', name: 'Top gauze' },
  { num: 25, catId: 'circulation', catName: 'Circulation', id: 'gauze', name: 'gauze' },
  { num: 26, catId: 'circulation', catName: 'Circulation', id: 'roll-gauze', name: 'Roll gauze' },
  { num: 27, catId: 'circulation', catName: 'Circulation', id: 'elastic-bandage', name: 'Elastic bandage ขนาดต่างๆ' },
  { num: 28, catId: 'circulation', catName: 'Circulation', id: 'three-side-dressing', name: 'three side dressing' },
  { num: 29, catId: 'circulation', catName: 'Circulation', id: 'tourniquet-multi', name: 'tourniquet (อเนกประสงค์)' },
  { num: 30, catId: 'circulation', catName: 'Circulation', id: 'dtx-set', name: 'ชุด DTX' },

  // 3. ชุดอุปกรณ์ให้ IV (10 items)
  { num: 31, catId: 'iv-kit', catName: 'ชุดอุปกรณ์ให้ IV', id: 'medicut', name: 'medicut ขนาดต่างๆ' },
  { num: 32, catId: 'iv-kit', catName: 'ชุดอุปกรณ์ให้ IV', id: 'iv-set-child', name: 'set IV เด็ก' },
  { num: 33, catId: 'iv-kit', catName: 'ชุดอุปกรณ์ให้ IV', id: 'iv-set-adult', name: 'set IV ผู้ใหญ่' },
  { num: 34, catId: 'iv-kit', catName: 'ชุดอุปกรณ์ให้ IV', id: 'three-way', name: 'three way' },
  { num: 35, catId: 'iv-kit', catName: 'ชุดอุปกรณ์ให้ IV', id: 'extension-tube', name: 'extension tube' },
  { num: 36, catId: 'iv-kit', catName: 'ชุดอุปกรณ์ให้ IV', id: 'tourniquet', name: 'tourniquet' },
  { num: 37, catId: 'iv-kit', catName: 'ชุดอุปกรณ์ให้ IV', id: 'iv-plaster', name: 'พลาสเตอร์ IV' },
  { num: 38, catId: 'iv-kit', catName: 'ชุดอุปกรณ์ให้ IV', id: 'transpore-1-inch', name: 'transpore 1"' },
  { num: 39, catId: 'iv-kit', catName: 'ชุดอุปกรณ์ให้ IV', id: 'heplock', name: 'heplock' },
  { num: 40, catId: 'iv-kit', catName: 'ชุดอุปกรณ์ให้ IV', id: 'alcohol-ball-iv', name: 'alcohol ball' },

  // 4. ชุดอุปกรณ์ฉีดยา (3 items)
  { num: 41, catId: 'injection-kit', catName: 'ชุดอุปกรณ์ฉีดยา', id: 'syringe', name: 'syringe ขนาดต่างๆ (50,20,10,5,3 cc)' },
  { num: 42, catId: 'injection-kit', catName: 'ชุดอุปกรณ์ฉีดยา', id: 'needles', name: 'เข็มเบอร์ต่างๆ (18,21,23,24,25,26)' },
  { num: 43, catId: 'injection-kit', catName: 'ชุดอุปกรณ์ฉีดยา', id: 'alcohol-ball-inject', name: 'alcohol ball' },

  // 5. อุปกรณ์ดาม & ยกเคลื่อนย้าย (8 items)
  { num: 44, catId: 'splint-moving', catName: 'อุปกรณ์ดาม & ยกเคลื่อนย้าย', id: 'spinal-board', name: 'spinal board' },
  { num: 45, catId: 'splint-moving', catName: 'อุปกรณ์ดาม & ยกเคลื่อนย้าย', id: 'head-immobilize', name: 'Head immobilizer' },
  { num: 46, catId: 'splint-moving', catName: 'อุปกรณ์ดาม & ยกเคลื่อนย้าย', id: 'belt', name: 'สายรัด belt' },
  { num: 47, catId: 'splint-moving', catName: 'อุปกรณ์ดาม & ยกเคลื่อนย้าย', id: 'hard-collar', name: 'Hard collar ขนาดต่างๆ' },
  { num: 48, catId: 'splint-moving', catName: 'อุปกรณ์ดาม & ยกเคลื่อนย้าย', id: 'ked', name: 'KED' },
  { num: 49, catId: 'splint-moving', catName: 'อุปกรณ์ดาม & ยกเคลื่อนย้าย', id: 'vacuum-splint', name: 'vacuum splint' },
  { num: 50, catId: 'splint-moving', catName: 'อุปกรณ์ดาม & ยกเคลื่อนย้าย', id: 'leg-splint', name: 'ไม้ดามขา' },
  { num: 51, catId: 'splint-moving', catName: 'อุปกรณ์ดาม & ยกเคลื่อนย้าย', id: 'arm-splint', name: 'ไม้ดามแขน' },

  // 6. ชุด PPE (9 items)
  { num: 52, catId: 'ppe', catName: 'ชุด PPE', id: 'gloves-disposable', name: 'ถุงมือ Disposable' },
  { num: 53, catId: 'ppe', catName: 'ชุด PPE', id: 'gloves-sterile', name: 'ถุงมือ sterile' },
  { num: 54, catId: 'ppe', catName: 'ชุด PPE', id: 'apron', name: 'เอี๊ยม' },
  { num: 55, catId: 'ppe', catName: 'ชุด PPE', id: 'mask', name: 'หน้ากากอนามัย' },
  { num: 56, catId: 'ppe', catName: 'ชุด PPE', id: 'mask-n95', name: 'หน้ากาก N95' },
  { num: 57, catId: 'ppe', catName: 'ชุด PPE', id: 'raincoat', name: 'เสื้อกันฝน' },
  { num: 58, catId: 'ppe', catName: 'ชุด PPE', id: 'boots', name: 'รองเท้าบูท' },
  { num: 59, catId: 'ppe', catName: 'ชุด PPE', id: 'goggles', name: 'แว่นตานิรภัย' },
  { num: 60, catId: 'ppe', catName: 'ชุด PPE', id: 'cap', name: 'หมวกคลุมผม' },

  // 7. Safety (11 items)
  { num: 61, catId: 'safety', catName: 'Safety', id: 'reflective-vest', name: 'เสื้อสะท้อนแสง' },
  { num: 62, catId: 'safety', catName: 'Safety', id: 'safety-helmet', name: 'หมวกกันกระแทก' },
  { num: 63, catId: 'safety', catName: 'Safety', id: 'traffic-cone', name: 'กรวยและอุปกรณ์สะท้อนแสง' },
  { num: 64, catId: 'safety', catName: 'Safety', id: 'barrier-tape', name: 'แถบกั้นจราจร' },
  { num: 65, catId: 'safety', catName: 'Safety', id: 'fire-extinguisher', name: 'ถังดับเพลิง' },
  { num: 66, catId: 'safety', catName: 'Safety', id: 'whistle', name: 'นกหวีด' },
  { num: 67, catId: 'safety', catName: 'Safety', id: 'glass-breaker', name: 'อุปกรณ์ทุบกระจก & ตัดสายรัด' },
  { num: 68, catId: 'safety', catName: 'Safety', id: 'traffic-wand', name: 'กระบองไฟจราจร' },
  { num: 69, catId: 'safety', catName: 'Safety', id: 'flashlight-safety', name: 'ไฟฉาย' },
  { num: 70, catId: 'safety', catName: 'Safety', id: 'scissors', name: 'กรรไกร' },
  { num: 71, catId: 'safety', catName: 'Safety', id: 'bulletproof-vest', name: 'เสื้อกันกระสุน' },

  // 8. อุปกรณ์อื่นๆ ทั่วไป (7 items)
  { num: 72, catId: 'other', catName: 'อุปกรณ์อื่นๆ ทั่วไป', id: 'red-bag', name: 'ถุงขยะติดเชื้อ (ถุงแดง)' },
  { num: 73, catId: 'other', catName: 'อุปกรณ์อื่นๆ ทั่วไป', id: 'trash-bag', name: 'ถุงขยะทั่วไป' },
  { num: 74, catId: 'other', catName: 'อุปกรณ์อื่นๆ ทั่วไป', id: 'hand-sanitizer', name: 'เจลล้างมือ' },
  { num: 75, catId: 'other', catName: 'อุปกรณ์อื่นๆ ทั่วไป', id: 'ammonia', name: 'แอมโมเนียหอม' },
  { num: 76, catId: 'other', catName: 'อุปกรณ์อื่นๆ ทั่วไป', id: 'nss-wound', name: 'NSS ล้างแผล' },
  { num: 77, catId: 'other', catName: 'อุปกรณ์อื่นๆ ทั่วไป', id: 'betadine', name: 'เบต้าดีน' },
  { num: 78, catId: 'other', catName: 'อุปกรณ์อื่นๆ ทั่วไป', id: 'consent-form', name: 'ใบยินยอม/ไม่ยินยอมรักษา' }
];

// Global App State
let currentVehicle = 'คันที่ 1 (รถ Refer)';
let inspectionFormState = {};
let inspectionsData = [];
let db = null;
let analytics = null;
let isFirebaseActive = false;
let barChartObj = null;
let doughnutChartObj = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  setInitialDate();
  renderChecklistCategories();
  initFirebaseOrLocal();
});

// Set current local datetime input
function setInitialDate() {
  const dateInput = document.getElementById('inspectionDate');
  if (dateInput) {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    dateInput.value = now.toISOString().slice(0, 16);
  }
}

// Dynamically Render All 8 Categories & 78 Items
function renderChecklistCategories() {
  const container = document.getElementById('checklistCategoriesContainer');
  if (!container) return;
  container.innerHTML = '';

  // Group items by catId
  const grouped = {};
  Object.keys(CATEGORIES_META).forEach(catId => {
    grouped[catId] = CHECKLIST_ITEMS_78.filter(item => item.catId === catId);
  });

  let catIdx = 1;
  Object.keys(grouped).forEach(catId => {
    const meta = CATEGORIES_META[catId];
    const items = grouped[catId];
    if (!items || items.length === 0) return;

    const block = document.createElement('div');
    block.className = 'category-block';

    const rowsHtml = items.map(item => {
      // Default state: ready
      inspectionFormState[item.id] = { status: 'READY', note: '', name: item.name, catName: meta.name };

      return `
        <tr>
          <td style="width: 8%; text-align: center; color: var(--text-muted); font-weight: 600;">${item.num}</td>
          <td style="width: 37%;"><strong>${item.name}</strong> <span style="font-size: 0.75rem; color: var(--text-muted);">(${item.id})</span></td>
          <td style="width: 33%;">
            <div class="status-options">
              <button type="button" class="status-btn ready active" id="btn_${item.id}_READY" onclick="setCheckitemStatus('${item.id}', 'READY')">
                <i class="fa-solid fa-circle-check"></i> พร้อมใช้
              </button>
              <button type="button" class="status-btn repair" id="btn_${item.id}_REPAIR" onclick="setCheckitemStatus('${item.id}', 'REPAIR')">
                <i class="fa-solid fa-circle-xmark"></i> ชำรุด
              </button>
              <button type="button" class="status-btn refill" id="btn_${item.id}_REFILL" onclick="setCheckitemStatus('${item.id}', 'REFILL')">
                <i class="fa-solid fa-circle-exclamation"></i> ต้องเติม
              </button>
            </div>
          </td>
          <td style="width: 22%;">
            <input type="text" class="form-control" style="padding: 0.35rem 0.6rem; font-size: 0.85rem;" 
              placeholder="หมายเหตุ..." onchange="setCheckitemNote('${item.id}', this.value)">
          </td>
        </tr>
      `;
    }).join('');

    block.innerHTML = `
      <div class="category-header">
        <i class="fa-solid ${meta.icon}"></i> ${catIdx}. ${meta.name} (${items.length} รายการ)
      </div>
      <div class="table-responsive">
        <table class="checklist-table">
          <thead>
            <tr>
              <th style="text-align: center;">ลำดับ</th>
              <th>รายการอุปกรณ์ (Equipment Name)</th>
              <th>สถานะการตรวจเช็ค</th>
              <th>หมายเหตุเพิ่มเติม</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;

    container.appendChild(block);
    catIdx++;
  });
}

// Select All Items Status Helper
function setAllItemsStatus(status) {
  CHECKLIST_ITEMS_78.forEach(item => {
    setCheckitemStatus(item.id, status);
  });
  showToast(`ตั้งค่าให้รายการทั้งหมด 78 รายการ เป็น "${status === 'READY' ? 'พร้อมใช้งาน' : status}" แล้ว`, 'info');
}

// Vehicle Selection Handler
function selectVehicle(vehicleName, element) {
  currentVehicle = vehicleName;
  document.getElementById('selectedVehicle').value = vehicleName;
  
  document.querySelectorAll('.vehicle-card').forEach(card => card.classList.remove('selected'));
  element.classList.add('selected');
}

// Item Status Pill Handler
function setCheckitemStatus(itemId, status) {
  if (!inspectionFormState[itemId]) {
    inspectionFormState[itemId] = { status: status, note: '' };
  } else {
    inspectionFormState[itemId].status = status;
  }
  
  ['READY', 'REPAIR', 'REFILL'].forEach(s => {
    const btn = document.getElementById(`btn_${itemId}_${s}`);
    if (btn) btn.classList.remove('active');
  });
  
  const activeBtn = document.getElementById(`btn_${itemId}_${status}`);
  if (activeBtn) activeBtn.classList.add('active');
}

function setCheckitemNote(itemId, note) {
  if (inspectionFormState[itemId]) {
    inspectionFormState[itemId].note = note;
  }
}

// Switch Active Navigation Tab
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add('active');

  // Activate tab button highlight
  const indexMap = { 'formTab': 0, 'dashboardTab': 1, 'historyTab': 2 };
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns[indexMap[tabId]]) {
    tabBtns[indexMap[tabId]].classList.add('active');
  }

  if (tabId === 'dashboardTab') {
    renderDashboard();
  } else if (tabId === 'historyTab') {
    filterHistoryTable();
  }
}

// -------------------------------------------------------------
// ULTRA-FAST FIREBASE & PERSISTENCE ENGINE
// -------------------------------------------------------------

function initFirebaseOrLocal() {
  let config = DEFAULT_FIREBASE_CONFIG;
  const savedCfg = localStorage.getItem('ambulance_firebase_config');

  if (savedCfg) {
    try {
      const parsed = JSON.parse(savedCfg);
      if (parsed.apiKey && parsed.projectId) {
        config = parsed;
      }
    } catch (e) {
      console.warn('Invalid saved Firebase config, using default ambulance-cir', e);
    }
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    db = firebase.firestore();
    
    // Enable Offline Persistence for Instant Writes
    db.enablePersistence({ synchronizeTabs: true }).catch(err => {
      if (err.code == 'failed-precondition') {
        console.warn('Persistence failed: Multiple tabs open');
      } else if (err.code == 'unimplemented') {
        console.warn('Persistence not supported by browser');
      }
    });

    if (firebase.analytics) {
      analytics = firebase.analytics();
    }
    isFirebaseActive = true;
    updateSyncBadge(true, `Firebase: ${config.projectId}`);
    listenFirebaseData();
  } catch (err) {
    console.warn('Firebase init warning, fallback to LocalStorage', err);
    isFirebaseActive = false;
    updateSyncBadge(false, 'Local Storage Mode');
    loadLocalData();
  }
}

function updateSyncBadge(isFirebase, text) {
  const badgeText = document.getElementById('syncStatusText');
  const dot = document.getElementById('statusDot');
  if (badgeText && dot) {
    badgeText.innerText = text;
    if (isFirebase) {
      dot.className = 'status-dot';
    } else {
      dot.className = 'status-dot local';
    }
  }
}

// Firebase Realtime Firestore Listener
function listenFirebaseData() {
  if (!db) return;
  db.collection('ambulance_inspections')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      inspectionsData = [];
      snapshot.forEach(doc => {
        inspectionsData.push({ id: doc.id, ...doc.data() });
      });

      // If database is empty, seed demo data for instant experience
      if (inspectionsData.length === 0) {
        inspectionsData = createMockData78();
      }
      refreshActiveViews();
    }, err => {
      console.error('Firestore Read Error:', err);
      showToast('ไม่สามารถเชื่อมต่อ Firestore ได้ สลับใช้ Local Mode', 'error');
      updateSyncBadge(false, 'Local Storage Fallback');
      loadLocalData();
    });
}

// Local Storage Handler with Initial Mock Data
function loadLocalData() {
  const localData = localStorage.getItem('ambulance_inspections_data_78');
  if (localData) {
    inspectionsData = JSON.parse(localData);
  } else {
    inspectionsData = createMockData78();
    localStorage.setItem('ambulance_inspections_data_78', JSON.stringify(inspectionsData));
  }
  refreshActiveViews();
}

function saveLocalData() {
  localStorage.setItem('ambulance_inspections_data_78', JSON.stringify(inspectionsData));
  refreshActiveViews();
}

function refreshActiveViews() {
  const activeTab = document.querySelector('.tab-content.active');
  if (activeTab && activeTab.id === 'dashboardTab') {
    renderDashboard();
  } else if (activeTab && activeTab.id === 'historyTab') {
    filterHistoryTable();
  }
}

// Generate Realistic 78-Item Inspections
function createMockData78() {
  const vehicles = ['คันที่ 1 (รถ Refer)', 'คันที่ 2 (รถ EMS)', 'คันที่ 3', 'คันที่ 4'];
  const inspectors = ['พว.สมชาย ใจดี', 'พว.อนันต์ นารา', 'พว.สุดารัตน์ มีสุข', 'พว.ดาวเรือง ปันสุข'];
  const shifts = ['เวรเช้า (08:00 - 16:00)', 'เวรบ่าย (16:00 - 24:00)', 'เวรดึก (00:00 - 08:00)'];

  const mocks = [];
  const now = new Date();

  vehicles.forEach((v, idx) => {
    const d = new Date(now);
    d.setHours(d.getHours() - (idx * 12));

    const itemStates = {};
    let readyCnt = 0, repairCnt = 0, refillCnt = 0;

    CHECKLIST_ITEMS_78.forEach(item => {
      let st = 'READY';
      let note = '';

      if (v.includes('คันที่ 2') && item.id === 'aed') {
        st = 'REPAIR';
        note = 'แบตเตอรี่เตือนต่ำ แจ้งช่างเปลี่ยนแผ่น';
      } else if (v.includes('คันที่ 3') && item.id === 'nss-1000') {
        st = 'REFILL';
        note = 'เหลือ 1 ขวด ต้องเติมเข้าสต็อก';
      } else if (v.includes('คันที่ 4') && item.id === 'traffic-wand') {
        st = 'REPAIR';
        note = 'ถ่านหมด ไฟกระพริบไม่ติด';
      } else if (v.includes('คันที่ 1') && item.id === 'oxygen-tank-2') {
        st = 'REFILL';
        note = 'แรงดันเหลือ 500 PSI ต้องสลับถุงเติม';
      }

      if (st === 'READY') readyCnt++;
      if (st === 'REPAIR') repairCnt++;
      if (st === 'REFILL') refillCnt++;

      itemStates[item.id] = { 
        id: item.id,
        name: item.name, 
        catId: item.catId,
        catName: item.catName,
        status: st, 
        note: note 
      };
    });

    mocks.push({
      id: 'mock_78_' + (Date.now() - idx * 10000),
      vehicle: v,
      inspector: inspectors[idx % inspectors.length],
      shift: shifts[idx % shifts.length],
      dateStr: d.toLocaleString('th-TH'),
      timestamp: d.getTime(),
      readyCount: readyCnt,
      repairCount: repairCnt,
      refillCount: refillCnt,
      totalCount: CHECKLIST_ITEMS_78.length,
      items: itemStates
    });
  });

  return mocks;
}

// -------------------------------------------------------------
// OPTIMISTIC NON-BLOCKING SUBMISSION HANDLER (INSTANT 0ms UI)
// -------------------------------------------------------------

function handleFormSubmit(e) {
  e.preventDefault();

  const vehicle = document.getElementById('selectedVehicle').value;
  const inspector = document.getElementById('inspectorName').value;
  const shift = document.getElementById('shiftType').value;
  const rawDate = document.getElementById('inspectionDate').value;
  const dateObj = rawDate ? new Date(rawDate) : new Date();

  let readyCnt = 0, repairCnt = 0, refillCnt = 0;
  const itemsBreakdown = {};

  CHECKLIST_ITEMS_78.forEach(item => {
    const state = inspectionFormState[item.id] || { status: 'READY', note: '' };
    const st = state.status || 'READY';

    if (st === 'READY') readyCnt++;
    if (st === 'REPAIR') repairCnt++;
    if (st === 'REFILL') refillCnt++;

    itemsBreakdown[item.id] = {
      id: item.id,
      name: item.name,
      catId: item.catId,
      catName: item.catName,
      status: st,
      note: state.note || ''
    };
  });

  const docId = 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

  const record = {
    id: docId,
    vehicle: vehicle,
    inspector: inspector,
    shift: shift,
    dateStr: dateObj.toLocaleString('th-TH'),
    timestamp: dateObj.getTime(),
    readyCount: readyCnt,
    repairCount: repairCnt,
    refillCount: refillCnt,
    totalCount: CHECKLIST_ITEMS_78.length,
    items: itemsBreakdown
  };

  // 1. INSTANT OPTIMISTIC LOCAL UPDATE (0 Milliseconds Response!)
  inspectionsData.unshift(record);
  saveLocalData();

  // 2. SHOW SUCCESS TOAST IMMEDIATELY
  showToast(`⚡ บันทึกการตรวจเช็ค 78 รายการ (${vehicle}) สำเร็จทันที!`, 'success');

  // 3. INSTANT FORM RESET
  document.getElementById('inspectionForm').reset();
  setInitialDate();
  renderChecklistCategories();

  // 4. NON-BLOCKING BACKGROUND CLOUD SYNC
  if (isFirebaseActive && db) {
    db.collection('ambulance_inspections').doc(docId).set(record).catch(err => {
      console.warn('Background Firestore Sync Exception:', err);
    });
  }
}

// -------------------------------------------------------------
// DASHBOARD CONTROLLER & CHARTS
// -------------------------------------------------------------

function renderDashboard() {
  const filterVal = document.getElementById('dashVehicleFilter').value;

  let filtered = inspectionsData;
  if (filterVal !== 'ALL') {
    filtered = inspectionsData.filter(r => r.vehicle === filterVal);
  }

  // KPI Calculations
  let totalReady = 0, totalRepair = 0, totalRefill = 0, totalItems = 0;
  const defectList = [];

  filtered.forEach(rec => {
    totalReady += rec.readyCount || 0;
    totalRepair += rec.repairCount || 0;
    totalRefill += rec.refillCount || 0;
    totalItems += rec.totalCount || 0;

    // Collect defect items
    if (rec.items) {
      Object.keys(rec.items).forEach(k => {
        const itm = rec.items[k];
        if (itm.status === 'REPAIR' || itm.status === 'REFILL') {
          defectList.push({
            vehicle: rec.vehicle,
            code: k,
            name: itm.name || k,
            category: itm.catName || 'อุปกรณ์ทั่วไป',
            status: itm.status,
            note: itm.note,
            date: rec.dateStr
          });
        }
      });
    }
  });

  const readinessPercent = totalItems > 0 ? Math.round((totalReady / totalItems) * 100) : 100;

  document.getElementById('kpiReadiness').innerText = `${readinessPercent}%`;
  document.getElementById('kpiTotalInspections').innerText = filtered.length;
  document.getElementById('kpiRepairNeeded').innerText = totalRepair;
  document.getElementById('kpiRefillNeeded').innerText = totalRefill;

  // Render Defect Table
  const tbody = document.getElementById('defectItemsBody');
  if (tbody) {
    if (defectList.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">🎉 ไม่พบรายการอุปกรณ์ชำรุดหรือขาดแคลน รถพยาบาลพร้อมปฏิบัติการ 100%</td></tr>';
    } else {
      tbody.innerHTML = defectList.slice(0, 15).map(d => `
        <tr>
          <td><strong>${d.vehicle}</strong></td>
          <td><code>${d.code}</code></td>
          <td>${d.name}</td>
          <td><span class="badge badge-blue">${d.category}</span></td>
          <td>
            ${d.status === 'REPAIR' 
              ? '<span class="badge badge-red"><i class="fa-solid fa-screwdriver-wrench"></i> ชำรุด (ต้องซ่อม)</span>' 
              : '<span class="badge badge-amber"><i class="fa-solid fa-box-open"></i> ขาดแคลน (ต้องเติม)</span>'}
          </td>
          <td>${d.note || '-'}</td>
          <td>${d.date}</td>
        </tr>
      `).join('');
    }
  }

  // Render Charts
  renderBarChart();
  renderDoughnutChart(totalReady, totalRepair, totalRefill);
}

function renderBarChart() {
  const ctx = document.getElementById('barChartVehicles');
  if (!ctx) return;

  const vehiclesList = ['คันที่ 1 (รถ Refer)', 'คันที่ 2 (รถ EMS)', 'คันที่ 3', 'คันที่ 4'];
  const readinessData = vehiclesList.map(v => {
    const vInspections = inspectionsData.filter(r => r.vehicle === v);
    if (vInspections.length === 0) return 100;
    const latest = vInspections[0]; // Recent inspection
    return latest.totalCount > 0 ? Math.round((latest.readyCount / latest.totalCount) * 100) : 100;
  });

  if (barChartObj) barChartObj.destroy();

  barChartObj = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['คันที่ 1 (Refer)', 'คันที่ 2 (EMS)', 'คันที่ 3', 'คันที่ 4'],
      datasets: [{
        label: 'อัตราความพร้อมใช้งาน (%) (จาก 78 รายการ)',
        data: readinessData,
        backgroundColor: ['#059669', '#0284c7', '#10b981', '#6366f1'],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}

function renderDoughnutChart(ready, repair, refill) {
  const ctx = document.getElementById('doughnutStatus');
  if (!ctx) return;

  if (doughnutChartObj) doughnutChartObj.destroy();

  doughnutChartObj = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['พร้อมใช้งาน', 'ชำรุด (ต้องซ่อม)', 'ขาดแคลน (ต้องเติม)'],
      datasets: [{
        data: [ready, repair, refill],
        backgroundColor: ['#10b981', '#ef4444', '#f59e0b']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

// -------------------------------------------------------------
// HISTORY TABLE CONTROLLER
// -------------------------------------------------------------

function filterHistoryTable() {
  const vehicleFilter = document.getElementById('histVehicleFilter').value;
  const search = document.getElementById('histSearchInput').value.toLowerCase();

  let filtered = inspectionsData;

  if (vehicleFilter !== 'ALL') {
    filtered = filtered.filter(r => r.vehicle === vehicleFilter);
  }

  if (search.trim() !== '') {
    filtered = filtered.filter(r => 
      (r.inspector && r.inspector.toLowerCase().includes(search)) ||
      (r.vehicle && r.vehicle.toLowerCase().includes(search)) ||
      (r.shift && r.shift.toLowerCase().includes(search))
    );
  }

  const tbody = document.getElementById('historyTableBody');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">ไม่พบประวัติการตรวจเช็คตามเงื่อนไขที่เลือก</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(rec => `
    <tr>
      <td>${rec.dateStr || '-'}</td>
      <td><span class="badge badge-blue"><i class="fa-solid fa-ambulance"></i> ${rec.vehicle}</span></td>
      <td><strong>${rec.inspector || '-'}</strong></td>
      <td>${rec.shift || '-'}</td>
      <td><span class="badge badge-green">${rec.readyCount} / ${rec.totalCount || 78}</span></td>
      <td>${rec.repairCount > 0 ? `<span class="badge badge-red">${rec.repairCount} รายการ</span>` : '0'}</td>
      <td>${rec.refillCount > 0 ? `<span class="badge badge-amber">${rec.refillCount} รายการ</span>` : '0'}</td>
      <td>
        <button class="btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="viewRecordDetail('${rec.id}')">
          <i class="fa-solid fa-eye"></i> ดูรายงาน
        </button>
      </td>
    </tr>
  `).join('');
}

// View Record Detail Modal (Full 78 Items View)
function viewRecordDetail(recordId) {
  const record = inspectionsData.find(r => r.id === recordId);
  if (!record) return;

  const modalBody = document.getElementById('detailModalBody');
  if (!modalBody) return;

  let itemsHtml = '';
  if (record.items) {
    itemsHtml = Object.keys(record.items).map((k, idx) => {
      const itm = record.items[k];
      let badge = '<span class="badge badge-green">พร้อมใช้</span>';
      if (itm.status === 'REPAIR') badge = '<span class="badge badge-red">ชำรุด</span>';
      if (itm.status === 'REFILL') badge = '<span class="badge badge-amber">ต้องเติม</span>';

      return `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td><code>${itm.id || k}</code></td>
          <td><strong>${itm.name || k}</strong></td>
          <td><span class="badge badge-blue">${itm.catName || '-'}</span></td>
          <td>${badge}</td>
          <td>${itm.note || '-'}</td>
        </tr>
      `;
    }).join('');
  }

  modalBody.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <h4 style="color: var(--primary-dark); font-size: 1.15rem;">${record.vehicle}</h4>
      <p style="font-size: 0.9rem; color: var(--text-muted);">
        <strong>วันที่ตรวจ:</strong> ${record.dateStr} | 
        <strong>ผู้ตรวจ:</strong> ${record.inspector} | 
        <strong>เวร:</strong> ${record.shift}
      </p>
    </div>
    
    <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem;">
      <span class="badge badge-green" style="font-size: 0.85rem;">พร้อมใช้งาน: ${record.readyCount} / ${record.totalCount || 78}</span>
      <span class="badge badge-red" style="font-size: 0.85rem;">ชำรุด: ${record.repairCount}</span>
      <span class="badge badge-amber" style="font-size: 0.85rem;">ต้องเติม: ${record.refillCount}</span>
    </div>

    <div style="max-height: 400px; overflow-y: auto;">
      <table class="data-table" style="font-size: 0.85rem;">
        <thead>
          <tr>
            <th style="width: 5%;">#</th>
            <th style="width: 15%;">Equipment ID</th>
            <th style="width: 30%;">Equipment Name</th>
            <th style="width: 20%;">Category</th>
            <th style="width: 15%;">Status</th>
            <th style="width: 15%;">Note</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById('detailModal').classList.add('open');
}

function closeDetailModal() {
  document.getElementById('detailModal').classList.remove('open');
}

// Export CSV Functionality
function exportHistoryCSV() {
  if (inspectionsData.length === 0) {
    showToast('ไม่มีข้อมูลประวัติสำหรับการส่งออก', 'info');
    return;
  }

  let csvContent = "\uFEFF"; // UTF-8 BOM for Thai Excel
  csvContent += "วันที่/เวลา,หมายเลขรถ,ผู้ตรวจเช็ค,เวร,พร้อมใช้,ชำรุด,ต้องเติม,รายการรวม\n";

  inspectionsData.forEach(r => {
    csvContent += `"${r.dateStr}","${r.vehicle}","${r.inspector}","${r.shift}",${r.readyCount},${r.repairCount},${r.refillCount},${r.totalCount || 78}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Ambulance_Inspections_78Items_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('ส่งออกไฟล์ CSV 78 รายการเรียบร้อยแล้ว', 'success');
}

// -------------------------------------------------------------
// FIREBASE CONFIG MODAL CONTROLLER
// -------------------------------------------------------------

function openConfigModal() {
  const currentCfg = JSON.parse(localStorage.getItem('ambulance_firebase_config') || JSON.stringify(DEFAULT_FIREBASE_CONFIG));
  
  document.getElementById('cfgApiKey').value = currentCfg.apiKey || '';
  document.getElementById('cfgAuthDomain').value = currentCfg.authDomain || '';
  document.getElementById('cfgProjectId').value = currentCfg.projectId || '';
  document.getElementById('cfgStorageBucket').value = currentCfg.storageBucket || '';
  document.getElementById('cfgAppId').value = currentCfg.appId || '';
  
  document.getElementById('configModal').classList.add('open');
}

function closeConfigModal() {
  document.getElementById('configModal').classList.remove('open');
}

function saveFirebaseConfig() {
  const config = {
    apiKey: document.getElementById('cfgApiKey').value.trim(),
    authDomain: document.getElementById('cfgAuthDomain').value.trim(),
    projectId: document.getElementById('cfgProjectId').value.trim(),
    storageBucket: document.getElementById('cfgStorageBucket').value.trim(),
    appId: document.getElementById('cfgAppId').value.trim()
  };

  if (!config.apiKey || !config.projectId) {
    showToast('กรุณากรอก API Key และ Project ID ให้ครบถ้วน', 'error');
    return;
  }

  localStorage.setItem('ambulance_firebase_config', JSON.stringify(config));
  closeConfigModal();
  showToast('บันทึกการตั้งค่า Firebase แล้ว! กำลังรีโหลดหน้าเว็บ...', 'success');

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

function clearFirebaseConfig() {
  localStorage.removeItem('ambulance_firebase_config');
  closeConfigModal();
  showToast('สลับระบบไปยัง Local Storage Mode แล้ว!', 'info');

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

// Toast Notifications Helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = '<i class="fa-solid fa-circle-info"></i>';
  if (type === 'success') icon = '<i class="fa-solid fa-circle-check"></i>';
  if (type === 'error') icon = '<i class="fa-solid fa-circle-xmark"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}
