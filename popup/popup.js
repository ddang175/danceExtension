// Handle bug report link click
document.getElementById('bugReportLink').addEventListener('click', (e) => {
    e.preventDefault();
    
    // For now, just show a message that the link will be added later
    // You can replace this with the actual bug report URL when ready
    alert('Bug report link will be added soon! Thank you for your feedback.');
    
    // When you have the actual URL, replace the above with:
    // window.open('YOUR_BUG_REPORT_URL', '_blank');
});