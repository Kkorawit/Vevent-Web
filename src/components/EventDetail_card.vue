
<script>


const props = defineProps({
  eventDetail:{
    type: Object,
    request: true
  }
})

console.log(props.eventDetail);

</script>
<template>
    <div class="event-detail">
    <h2>Event Detail</h2>
    <div class="detail-section">
      <label for="title">หัวข้อกิจกรรม (Event Title):</label>
      <input type="text" id="title" disabled v-model="eventData.title">
    </div>
    <div class="detail-section">
      <label for="category">หมวดหมู่ (Category):</label>
      <input type="text" id="category" disabled v-model="eventData.category">
    </div>
    <div class="detail-section">
      <label for="format">รูปแบบกิจกรรม (Event Format):</label>
      <input type="text" id="format" disabled v-model="eventData.format">
    </div>
    <div class="detail-section">
      <label for="attendees">จำนวนผู้เข้าร่วม (Number of Attendees):</label>
      <input type="text" id="attendees" disabled v-model="eventData.attendees">
    </div>
    <div class="detail-section">
      <label for="registration">
        วันที่เปิดรับสมัคร (Registration Opens):
      </label>
      <input type="text" id="registration" disabled v-model="eventData.registrationStart">
    </div>
    <div class="detail-section">
      <label for="deadline">
        วันที่ปิดรับสมัคร (Registration Deadline):
      </label>
      <input type="text" id="deadline" disabled v-model="eventData.registrationEnd">
    </div>
    <div class="detail-section">
      <a href="#">ตรวจสอบการเข้าร่วมกิจกรรม (Check Attendance)</a>
    </div>
    <div class="map-section">
      <label for="map">สถานที่ (Location):</label>
      <img src="https://placehold.it/300x150" alt="Event Location">
    </div>
  </div>

</template>
<style>
.event-detail {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.detail-section,
.map-section {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.detail-section label {
  width: 200px;
}

.map-section img {
  width: 100%;
  height: auto;
}
</style>