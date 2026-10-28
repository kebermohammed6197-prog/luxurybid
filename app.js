const modalBackdrop=document.getElementById('modalBackdrop');
const modalTitle=document.getElementById('modalTitle');
const modalMessage=document.getElementById('modalMessage');
const toast=document.getElementById('toast');
function openModal(title,message){modalTitle.textContent=title;modalMessage.textContent=message;modalBackdrop.hidden=false}
function closeModal(){modalBackdrop.hidden=true}
document.getElementById('modalClose').addEventListener('click',closeModal);
document.getElementById('modalOk').addEventListener('click',closeModal);
modalBackdrop.addEventListener('click',e=>{if(e.target===modalBackdrop)closeModal()});
document.querySelectorAll('.bid-btn').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.product,'This auction is a sample listing. Account creation, live bidding, countdowns, winner calculation, and Telebirr payments will be connected in later development steps.')));
document.getElementById('loginBtn').addEventListener('click',()=>openModal('Log in','The secure account system is not connected in this preview.'));
document.getElementById('signupBtn').addEventListener('click',()=>openModal('Create your account','Registration will be added when we build the secure backend.'));
document.querySelectorAll('.heart').forEach(btn=>btn.addEventListener('click',()=>{btn.classList.toggle('saved');btn.textContent=btn.classList.contains('saved')?'♥':'♡';showToast(btn.classList.contains('saved')?'Saved in this preview':'Removed from saved preview')}));
let activeFilter='all';
const searchInput=document.getElementById('searchInput');
function filterCards(){const q=searchInput.value.trim().toLowerCase();let shown=0;document.querySelectorAll('.auction-card').forEach(card=>{const matchesCategory=activeFilter==='all'||card.dataset.category===activeFilter;const matchesSearch=card.dataset.name.includes(q)||card.querySelector('h3').textContent.toLowerCase().includes(q);card.style.display=matchesCategory&&matchesSearch?'':'none';if(matchesCategory&&matchesSearch)shown++});document.getElementById('emptyState').hidden=shown!==0}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeFilter=btn.dataset.filter;filterCards()}));
searchInput.addEventListener('input',filterCards);
function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}
document.getElementById('notifyForm').addEventListener('submit',e=>{e.preventDefault();openModal('Thanks for your interest','This preview does not collect or send email addresses yet. We will connect notifications after a backend is added.');e.target.reset()});
document.getElementById('menuBtn').addEventListener('click',()=>openModal('Explore EthioBid','Use the sections on this page: Auctions, How it works, and Trust & safety.'));
