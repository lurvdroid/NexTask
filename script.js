--- script.js ---
</div>
`
listEl.appendChild(li)


li.querySelector('input[type=checkbox]').addEventListener('change', e=> toggleDone(e.target.dataset.id))
li.querySelector('.edit').addEventListener('click', e=> editTask(e.target.dataset.id))
li.querySelector('.del').addEventListener('click', e=> { if(confirm('Delete task?')) removeTask(e.target.dataset.id) })
})
}


function escapeHtml(s){ return s.replace(/[&<>"']/g, c=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]) }


// Events
addBtn.addEventListener('click', ()=>{ addTask(titleEl.value.trim(), dueEl.value, priorityEl.value); titleEl.value=''; dueEl.value=''; priorityEl.value='medium' })
searchEl.addEventListener('input', render)
filterEl.addEventListener('change', render)
clearCompletedBtn.addEventListener('click', ()=>{ if(confirm('Remove all completed tasks?')) clearCompleted() })
exportBtn.addEventListener('click', ()=>{
const blob = new Blob([JSON.stringify(tasks, null, 2)], {type:'application/json'})
const url = URL.createObjectURL(blob)
const a = document.createElement('a'); a.href=url; a.download='nextask.json'; a.click(); URL.revokeObjectURL(url)
})
importFile.addEventListener('change', e=>{
const f = e.target.files[0]; if(!f) return
const r = new FileReader(); r.onload = ev => {
try{ const imported = JSON.parse(ev.target.result); if(Array.isArray(imported)){ tasks = imported.concat(tasks); save(); render(); alert('Imported '+imported.length+' tasks') } else alert('Invalid JSON') }catch(err){ alert('Invalid JSON') }
}; r.readAsText(f)
})


// initial render
render()


--- README.md ---
# NexTask (Frontend)
Simple, responsive task manager built with HTML/CSS/Vanilla JS. Tasks persist in `localStorage`. Ready to push to GitHub and deploy to GitHub Pages or Vercel.


## Features
- Add / edit / delete tasks
- Mark complete
- Search + filter
- Due date + priority
- Export / import JSON
- Responsive design


## How to run locally
1. Clone the repo
2. Open `index.html` in your browser


## Deploy
- Push to GitHub and enable GitHub Pages (branch `main`, root directory) OR deploy the folder to Vercel.


--- .gitignore ---
node_modules/
.DS_Store
