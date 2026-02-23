import { createRouter, createWebHistory } from 'vue-router'


import Login from './views/Login.vue'
import Register from './views/Register.vue'

import test from './views/test.vue'
import test2 from './views/test2.vue' 

import Sidebar from './components/SIdebar.vue'
import evaluateeSIdebar from './components/evaluateeSIdebar.vue'
import evaluatorSIdebar from './components/evaluatorSIdebar.vue'

import Dashboard from './views/admin/dashboard.vue'
import period from './views/admin/period.vue'
import userlist from './views/admin/userlist.vue'
import topic from './views/admin/topic.vue'
import indicator from './views/admin/indicator.vue'
import assignment from './views/admin/assignment.vue'

import evaluateedashboard from './views/evaluatee/dashboard.vue'
import evaluateeprofile from './views/evaluatee/profile.vue'
import evaluateeperiod from './views/evaluatee/period.vue'
import evaluateeindicator from './views/evaluatee/indicator.vue'
import evaluateeestimate from './views/evaluatee/estimate.vue'

import evaluatorperiod from './views/evaluator/period.vue'
import evaluatorindicator from './views/evaluator/indicator.vue'
import evaluatorestimate from './views/evaluator/estimate.vue'
import evaluatorDashboard from './views/evaluator/dashboard.vue'



import adminaddperiod from './views/admin/addperiod.vue'
import adminadduser from './views/admin/adduser.vue'
import adminaddtopic from './views/admin/addtopic.vue'
import adminaddindicator from './views/admin/addindicator.vue'
import adminaddaddasignment from './views/admin/addasignment.vue'


import adminedituser from './views/admin/Edit/edituser.vue'
import evaluateeeditprofile from './views/evaluatee/editprofile.vue'
import editperiod from './views/admin/Edit/editperiod.vue'


const routes = [
  { path: '/test', name: 'test', component: test },
  { path: '/test2', name: 'test2', component: test2 },
  { path: '/', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path:'/admin',
    component: Sidebar,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
      { path: 'userlist', name: 'userlist', component: userlist, meta: { requiresAuth: true } },
      { path: 'period', name: 'period', component: period, meta: { requiresAuth: true } },
      { path: 'addperiod', name: 'addperiod', component: adminaddperiod, meta: { requiresAuth: true } },
      { path: 'adduser', name: 'adduser', component: adminadduser, meta: { requiresAuth: true } },
      { path: 'topic', name: 'topic', component: topic, meta: { requiresAuth: true } },
      { path: 'indicator', name: 'indicator', component: indicator, meta: { requiresAuth: true } },
      { path: 'assignment', name: 'assignment', component: assignment, meta: { requiresAuth: true } },
      { path: 'edituser/:id', name: 'edituser', component: adminedituser, meta: { requiresAuth: true } },
      { path: 'adminaddtopic', name: 'adminaddtopic', component: adminaddtopic, meta: { requiresAuth: true } },
      { path: 'adminaddindicator', name: 'adminaddindicator', component: adminaddindicator, meta: { requiresAuth: true } },
      { path: 'adminaddassignment', name: 'adminaddassignment', component: adminaddaddasignment, meta: { requiresAuth: true } },
      { path: 'editperiod/:id', name: 'editperiod', component: editperiod, meta: { requiresAuth: true } },
    ]
  },
  {path:'/evaluatee' , 
    component:evaluateeSIdebar,
    meta: { requiresAuth: true },
    children:[
      { path: '', redirect: '/evaluatee/evaluateedashboard' },
      { path: 'evaluateedashboard', name: 'evaluateeDashboard', component: evaluateedashboard, meta: { requiresAuth: true } },
      { path: 'profile', name: 'profile', component: evaluateeprofile, meta: { requiresAuth: true } },
      { path: 'evaluateeperiod', name: 'evaluateeperiod', component: evaluateeperiod, meta: { requiresAuth: true } },
      { path: 'evaluateeeditprofile', name: 'evaluateeeditprofile', component: evaluateeeditprofile, meta: { requiresAuth: true } },
      { path: 'evaluateeindicator/:id', name: 'evaluateeindicator', component: evaluateeindicator, meta: { requiresAuth: true } },
      { path: 'evaluateeestimate/:id', name: 'evaluateeestimate', component: evaluateeestimate, meta: { requiresAuth: true } },
    ]
  },
  {path:'/evaluator' , 
    component:evaluatorSIdebar,
    meta: { requiresAuth: true },
    children:[
          { path: '', redirect: '/evaluator/evaluatorperiod' },
      { path: 'evaluatorperiod', name: 'evaluatorperiod', component: evaluatorperiod, meta: { requiresAuth: true } },
      { path: 'evaluatorindicator/:id', name: 'evaluatorindicator', component: evaluatorindicator, meta: { requiresAuth: true } },
      { path: 'evaluatorestimate/:evaluateeId/:indicatorId', name: 'evaluatorestimate', component: evaluatorestimate, meta: { requiresAuth: true } },
      { path: 'evaluatordashboard', name: 'evaluatordashboard', component: evaluatorDashboard, meta: { requiresAuth: true } },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global Route Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/')   // ไม่มี token → กลับไปหน้า login
  } else {
    next()      // มี token → เข้าได้
  }
})

export default router
