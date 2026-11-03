import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Layouts from '../views/DashboardLayouts/Layouts.vue'

Vue.use(VueRouter);

const routes = [
	{
		path:'/',
		name:'login',
		component: () => import('../views/Login.vue')
	},
	{
		path:'/dashboard',
		name:'dashboard',
		component:Layouts,
		children: [
			{
				path:'/panel',
				name:'Panel',
				component: () => import('../views/Dashboard/Panel.vue')
			},
			{
				path:'/user/list',
				name:'Lista de usuarios',
				component: () => import('../views/Dashboard/Administration/Users/UserList.vue')
			},
			{
				path:'/user/create',
				name:'Crear usuario',
				component: () => import('../views/Dashboard/Administration/Users/FormUser.vue')
			},
			{
				path:'/user/update/:id',
				name:'Editar usuario',
				component: () => import('../views/Dashboard/Administration/Users/UpdateUser.vue')
			},
			{
				path:'/contract/list',
				name:'Listado de contrato',
				component: () => import('../views/Dashboard/Administration/Contract/ContractList.vue')
			},
			{
				path:'/contract/create',
				name:'Crear Contrato',
				component: () => import('../views/Dashboard/Administration/Contract/FormContract.vue')
			},
			{
				path:'/contract/list/glosa',
				name:'Contratos para glosas',
				component: () => import('../views/Dashboard/Auditoria/List_Entity.vue')
			},
			{
				path:'/audit/list/:nit',
				name:'Listado de Glosas',
				component: () => import('../views/Dashboard/Auditoria/List_Glosa.vue')
			},
			{
				path:'/audit/upload',
				name:'Subir Facturas',
				component: () => import('../views/Dashboard/Auditoria/Upload_Audit.vue')
			},
			{
				path:'/audit/invoce/list/:radicals/:lote/:nit',
				name:'Lista de facturas',
				component: () => import('../views/Dashboard/Auditoria/List_Data.vue')
			},
			{
				path:'/detail/invoice/:nit/:invoices',
				name:'Detalle Factura',
				component: () => import('../views/Dashboard/Auditoria/Detail_glosa.vue')
			},
			{
				path:'/audit/entity/:nit/lote/:lote/radical/:radicals',
				name:'Detalle Lote',
				component: () => import('../views/Dashboard/Auditoria/List_Invoice.vue')
			},
			{
				path:'/rol',
				name:'Roles',
				component: () => import('../views/Dashboard/Administration/Rol/Lista_rol.vue')
			},
			{
				path:'/rol/create',
				name:'Creación de Roles',
				component: () => import('../views/Dashboard/Administration/Rol/FormRol.vue')
			},
			{
				path:'/rol/create/:id',
				name:'Editar Rol',
				component: () => import('../views/Dashboard/Administration/Rol/FormRol.vue')
			},
			{
				path:'/inventory',
				name:'Inventario',
				component: () => import('../views/Dashboard/Inventario/List_Inventory.vue')
			},
			{
				path:'/inventory/add',
				name:'Agregar Producto',
				component: () => import('../views/Dashboard/Inventario/FormInventory.vue')
			},
			/* {
				path:'/category',
				name:'Categoria',
				component: () => import('./../views/Dashboard/Category/List_Category.vue')')
			}, */
			{
				path:'/category',
				name:'Agregar Categoria',
				component: () => import('../views/Dashboard/Category/Add_Category.vue')
			},
			{
				path:'/inventory/personnel/:item',
				name:'Agregar Inventario',
				component: () => import('../views/Dashboard/Inventario/Agg_Product.vue')
			},
			{
				path:'/inventory/Listpersonnel',
				name:'Inventario medico',
				component: () => import('../views/Dashboard/Inventario/list_medical.vue')
			},
			{
				path:'/healthcare/new',
				name:'Admisiones nuevo',
				component: () => import('../views/Dashboard/Healtcare/admission/admin_medical.vue')
			},
			{
				path:'/inventory/Medication_order',
				name:'Solicitud de Medicamentos',
				component: () => import('../views/Dashboard/Inventario/medication_order.vue')
      },
      {
				path:'/calendar',
				name:'Calendario de gestión',
				component: () => import('../views/Dashboard/pages/Calendar.vue')
			}
		]

	}
];

const router = new VueRouter({
	mode: "history",
  	routes,
});

export default router;
