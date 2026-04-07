const axios = require('axios');

async function testFullAPIResponse() {
  try {
    const BASE_URL = 'http://localhost:5000/api';
    const slug = 'foundations-of-ayurveda';
    
    console.log('\n=== TESTING FULL API RESPONSE ===\n');
    console.log(`GET ${BASE_URL}/courses/${slug}?lang=en`);
    
    const response = await axios.get(`${BASE_URL}/courses/${slug}`, {
      params: { lang: 'en' }
    });
    
    console.log('\n--- Response Status ---');
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    
    console.log('\n--- Response Structure ---');
    console.log(`response.data exists: ${!!response.data}`);
    console.log(`response.data.data exists: ${!!response.data?.data}`);
    console.log(`response.data.data.course exists: ${!!response.data?.data?.course}`);
    
    const course = response.data?.data?.course;
    
    if (course) {
      console.log('\n--- Course Data ---');
      console.log(`Title: ${course.title}`);
      console.log(`Slug: ${course.slug}`);
      console.log(`Lessons exists: ${!!course.lessons}`);
      console.log(`Lessons is array: ${Array.isArray(course.lessons)}`);
      console.log(`Lessons count: ${course.lessons?.length || 0}`);
      
      if (course.lessons && course.lessons.length > 0) {
        console.log('\n--- First Lesson ---');
        console.log(JSON.stringify(course.lessons[0], null, 2));
      } else {
        console.log('\n❌ NO LESSONS IN RESPONSE');
      }
    } else {
      console.log('\n❌ NO COURSE IN RESPONSE');
    }
    
    console.log('\n✓ Test complete');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testFullAPIResponse();
