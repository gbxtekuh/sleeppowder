// js/history.js
import { db, collection, addDoc, query, orderBy, getDocs } from './firebase.js';

const History = {
    async saveSession(uid, data) {
        try {
            await addDoc(collection(db, `users/${uid}/sleepHistory`), {
                ...data,
                date: new Date().toLocaleDateString('pt-BR'),
                createdAt: new Date()
            });
        } catch (error) {
            console.error("Erro ao salvar histórico:", error);
        }
    },

    async getHistory(uid) {
        try {
            const q = query(collection(db, `users/${uid}/sleepHistory`), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const data = [];
            snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
            return data;
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            return [];
        }
    },

    render(containerId, history) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (history.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i data-lucide="moon" style="width: 48px; height: 48px; opacity: 0.5;"></i>
                    <p>Você ainda não possui sessões registradas.</p>
                </div>
            `;
            if (window.lucide) lucide.createIcons();
            return;
        }

        container.innerHTML = history.map(h => `
            <div class="card glass">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <p style="font-size: 12px; color: var(--text-dim);">${h.date}</p>
                        <h4 style="margin: 4px 0;">${h.soundName}</h4>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-weight: 700; color: var(--primary);">${h.score}</span>
                        <p style="font-size: 10px;">Score</p>
                    </div>
                </div>
                <p style="font-size: 14px; margin-top: 8px;">Duração: ${h.duration} min</p>
            </div>
        `).join('');
    }
};

export default History;
