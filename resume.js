/* ARUNX — Resume Management (IMPROVED) */
const ResumeManager = {
  currentResume: null,
  
  getResumes() {
    const user = Auth.getCurrentUser();
    if (!user) return [];
    return Utils.Storage.get('resumes_' + user.id, []);
  },
  
  saveResume(resumeData) {
    const user = Auth.getCurrentUser();
    if (!user) return false;
    
    const resumes = this.getResumes();
    resumeData.id = resumeData.id || Utils.generateId();
    resumeData.updatedAt = new Date().toISOString();
    
    const index = resumes.findIndex(r => r.id === resumeData.id);
    if (index !== -1) {
      resumes[index] = resumeData;
    } else {
      resumes.push(resumeData);
    }
    
    Utils.Storage.set('resumes_' + user.id, resumes);
    Utils.Toast.success('Resume saved!');
    return true;
  },
  
  deleteResume(id) {
    const user = Auth.getCurrentUser();
    if (!user) return false;
    
    let resumes = this.getResumes();
    resumes = resumes.filter(r => r.id !== id);
    Utils.Storage.set('resumes_' + user.id, resumes);
    Utils.Toast.success('Resume deleted!');
    return true;
  }
};

window.ResumeManager = ResumeManager;