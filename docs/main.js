(()=>{"use strict";var t,e={841:(t,e,s)=>{var i=s(128);class n extends i.Agj{constructor(t,e){super({radius:6,collisionType:i.Bpo.Active,z:10}),this.item=t,this.allocatedToCustomer=!1,e&&(this.pos=e.clone()),this.graphics.use(t.getSprite())}onPostUpdate(t,e){this.angularVelocity=this.vel.x/10,this.vel.x*=.99}}const o=s.p+"ce7496ad1af705d6ccee.png",r=s.p+"5de335bc34b557ac0a77.png",h=s.p+"084f6b4bd78bf012dc1c.png",a=s.p+"729b4d40d9b9a6b03d18.png",l=s.p+"fe80bbd024bed2d313e0.png",d=s.p+"317f0b8d7d7127116e52.png",c=s.p+"70ee555527104bb6766c.png",p=s.p+"48fff0201b6ff88f6844.png",u=s.p+"8b541599a7ea78270c3a.png",g=s.p+"5a2e7bc780c15f39858a.png",m=s.p+"27e85399b3457c32315e.png",w=s.p+"d9b79879af2d6c25e0bd.png",f=s.p+"7317fe13d3b7079227bb.png",y=s.p+"f1fecf680904d2a3d503.png",b=s.p+"6aaa2bfde529973c90c3.png",I=s.p+"baebf4fddc780da41f69.png",S=s.p+"775e95897a9d85eda888.png",P=s.p+"88e6b89986862ec39b02.png",T=s.p+"6adca5ff387053b536c6.png";var v=s(945),x=s(820),L=s(987),O=s(601),C=s(30),E=s(315),A=s(735),M=s(676);const R=new class{constructor(){this.Load={Sword:new i.bEs(o),Magor:new i.bEs(r),VeverkaRun:new i.bEs(a),VeverkaIdle:new i.bEs(l),ItemsImg:new i.bEs(w),Logo:new i.bEs(d),Lever:new i.bEs(c),PlatformSmall:new i.bEs(p),PlatformMedium:new i.bEs(u),PlatformWheel:new i.bEs(g),ResourceStation:new i.bEs(T),Wheel:new i.bEs(m),Button:new i.bEs(h),Machines:new i.bEs(f),LevelTable:new i.bEs(y),StarGold:new i.bEs(b),StarGrey:new i.bEs(I),Bubble:new i.bEs(S),Background:new i.bEs(P),JumpSound:new i.ABN(x),RunSound:new i.ABN(v),Chirp1Sound:new i.ABN(O),Chirp2Sound:new i.ABN(C),DropSound:new i.ABN(L),MainMusic:new i.ABN(E),GrinderSound:new i.ABN(A),BrewerSound:new i.ABN(M)},this.Items=k((()=>i.FLG.fromImageSource({image:this.Load.ItemsImg,grid:{columns:8,rows:8,spriteHeight:16,spriteWidth:16}}))),this.Machines=k((()=>i.FLG.fromImageSource({image:this.Load.Machines,grid:{columns:8,rows:5,spriteWidth:48,spriteHeight:70}})))}};function k(t){let e;return()=>(e=t(),e)}class B{getSprite(){return R.Items().getSprite(3,1)}}class D{getSprite(){return R.Items().getSprite(0,0)}grind(){return new G}roast(){return new U}}class G{getSprite(){return R.Items().getSprite(1,0)}brew(){return new z}roast(){return new W}}class z{getSprite(){return R.Items().getSprite(2,0)}}class U{getSprite(){return R.Items().getSprite(0,1)}}class W{getSprite(){return R.Items().getSprite(0,2)}}class _{getSprite(){return R.Items().getSprite(5,0)}}class N{constructor(t,e){this.sizeInPixels=t,this.scene=e,this.handler=this.onScenePreDraw.bind(this),e.on("predraw",this.handler)}deactivate(){this.scene.off("predraw",this.handler)}onScenePreDraw(t){this.scene.camera.pos=this.sizeInPixels.scale(.5);const e=Math.min(window.innerWidth/this.sizeInPixels.x,window.innerHeight/this.sizeInPixels.y);this.scene.camera.zoom=e}}class Q extends i.Agj{constructor(t,e){var s,n,o,r;super(),this.size=t;const{x:h,y:a}=t,l=10,d=[];(null===(s=null==e?void 0:e.top)||void 0===s||s)&&d.push(i.ypk.Box(h+20,l,(0,i.t6s)(0,0),(0,i.t6s)(0,-l))),(null===(n=null==e?void 0:e.down)||void 0===n||n)&&d.push(i.ypk.Box(h+20,l,(0,i.t6s)(0,0),(0,i.t6s)(0,a+l))),(null===(o=null==e?void 0:e.top)||void 0===o||o)&&d.push(i.ypk.Box(l,a,(0,i.t6s)(0,0),(0,i.t6s)(-l,0))),(null===(r=null==e?void 0:e.top)||void 0===r||r)&&d.push(i.ypk.Box(l,a,(0,i.t6s)(0,0),(0,i.t6s)(h+l,0))),this.collider.set(new i.ElT(d))}}class H extends i.Z58{constructor(t,e){super(),this.game=t,this.level=e,this.entityCounter=new i.JU7({text:""}),this.timeLabel=new i.JU7({text:""}),this.timePlayed=0,this.statistics={customersServed:0,customerLongestWait:0,pointsMax:0,pointsGained:0,recipesMade:0}}onInitialize(t){this.add(this.entityCounter),this.level.spawnItems(this),this.initializeClock();let e=t.input.pointers.primary;e.on("down",(t=>{console.log("spawn");let s=new n(new z);s.pos=e.lastWorldPos.clone(),this.add(s)})),this.physics.config.gravity=(0,i.t6s)(0,250),new N(this.level.size,this),this.add(new Q(this.level.size))}initializeClock(){this.timeLabel=new i.JU7({text:"",pos:(0,i.t6s)(this.level.size.x-50,20),font:new i.KQV({textAlign:i.nOB.Left,baseAlign:i.vhs.Bottom,family:"Pixelify Sans",size:80,unit:i.yRQ.Px,color:i.Q1f.Black,smoothing:!1,shadow:{blur:5,offset:(0,i.t6s)(0,0),color:i.Q1f.White}}),scale:(0,i.t6s)(1,1).scale(.2)}),this.add(this.timeLabel),this.add(new i.JU7({text:"[P] to PAUSE",pos:(0,i.t6s)(this.level.size.x-50,30),font:new i.KQV({textAlign:i.nOB.Left,baseAlign:i.vhs.Bottom,family:"Pixelify Sans",size:35,unit:i.yRQ.Px,color:i.Q1f.Black,smoothing:!1,shadow:{blur:5,offset:(0,i.t6s)(0,0),color:i.Q1f.White}}),scale:(0,i.t6s)(1,1).scale(.2)}))}onPreDraw(t,e){const s=this.level.timeLimitMs-this.timePlayed,i=Math.floor(s/6e4),n=Math.floor((s-60*i*1e3)/1e3);this.timeLabel.text=`${i<10?"0"+i:i}:${n<10?"0"+n:n}`}onPreUpdate(t,e){this.timePlayed+=e,this.timePlayed>=this.level.timeLimitMs&&(this.statistics.pointsMax=200,this.statistics.pointsGained=130,this.game.showLevelOutro(this.statistics)),t.input.keyboard.wasPressed(i.D$R.P)&&this.game.showPause()}}class j{constructor(t,e,s,n,o=j.GREY,r=i.nOB.Center){const h=new i.EYj({text:n,font:new i.KQV({textAlign:r,baseAlign:i.vhs.Bottom,family:"Pixelify Sans",size:s,unit:i.yRQ.Px,color:o,smoothing:!1})});h.scale=(0,i.t6s)(1,1).scale(.1),this._actor=new i.Agj,this._actor.graphics.use(h),this.actor.pos=(0,i.t6s)(t+h.width/2,e)}get actor(){return this._actor}}j.WHITE=new i.Q1f(255,255,255),j.GREY=new i.Q1f(46,46,46),j.ORANGE=new i.Q1f(242,157,79);class F{constructor(t,e,s){this.ingredient1=t,this.ingredient2=e,this.result=s}show(t,e,s){const o=R.Items().getSprite(0,2),r=R.Items().getSprite(1,2),h=new i.Agj({pos:(0,i.t6s)(e,s)});h.graphics.add(this.ingredient1.getSprite()),t.add(h);const a=new i.Agj({pos:(0,i.t6s)(e+16,s)});a.graphics.add(o),t.add(a);const l=new i.Agj({pos:(0,i.t6s)(e+32,s)});l.graphics.add(this.ingredient2.getSprite()),t.add(l);const d=new i.Agj({pos:(0,i.t6s)(e+48,s)});d.graphics.add(r),t.add(d);const c=new n(this.result,(0,i.t6s)(e+64,s));c.body.collisionType=i.Bpo.PreventCollision,c.graphics.add(this.result.getSprite()),t.add(c)}}class Y extends i.Z58{constructor(t,e,s,n=!1){super(),this.game=t,this.level=e,this.levelId=s,this.paused=n,this.height=180,this.width=180,this.scaler=new N((0,i.t6s)(this.width,this.height),this),this.hintText=new i.Agj}onInitialize(t){this.backgroundColor=new i.Q1f(216,185,157);const e=new i.Agj({x:this.width/2,y:this.height/4});e.graphics.add(R.Load.LevelTable.toSprite()),this.add(e),this.add(new j(this.width/2+2,58,56,`Level  ${this.levelId+1}`,j.WHITE).actor),this.hintText=new j(this.width/2,75,40,"Want a little hint?",j.WHITE).actor,this.add(this.hintText),this.showHint(),this.paused?(this.add(new j(this.width/2,this.height/2+50,70,"PAUSED",j.GREY).actor),this.add(new j(this.width/2,this.height/2+60,40,"Press [SPACE] to continue",j.GREY).actor)):this.add(new j(this.width/2,this.height/2+60,40,"Press [SPACE] to play",j.GREY).actor)}showHint(){const t=this.level.getNewRecipes();for(let e=0;e<t.length;e++){t[e].show(this,this.width/2-32,this.height/2-10+16*e+5)}}onPreUpdate(t,e){t.input.keyboard.wasPressed(i.D$R.Space)&&(this.paused?this.game.exitPause():this.game.showCurrentLevel())}onDeactivate(t){this.scaler.deactivate()}}class $ extends i.Z58{constructor(t){super(),this.game=t,this.height=180,this.width=180,this.scaler=new N((0,i.t6s)(this.width,this.height),this)}onInitialize(t){this.backgroundColor=new i.Q1f(216,185,157);const e=new i.Agj({x:this.width/2,y:this.height/4});e.graphics.add(R.Load.Logo.toSprite()),this.add(e),this.add(new j(this.width/2,this.height/2+20,56,"Your forest cafe awaits...\n Brew, Bake, Delight!").actor),this.add(new j(this.width/2,this.height/2+60,40,"Press [SPACE] to play").actor)}onPreUpdate(t,e){t.input.keyboard.wasPressed(i.D$R.Space)&&this.game.showLevelIntro()}onDeactivate(t){this.scaler.deactivate()}}class V extends i.Z58{constructor(t,e,s){super(),this.game=t,this.levelId=e,this.statistics=s;const n=s.pointsGained/s.pointsMax;this.starsGained=n<.33?1:n<.66?2:3,this.height=180,this.width=180,this.scaler=new N((0,i.t6s)(this.width,this.height),this)}onInitialize(t){this.backgroundColor=new i.Q1f(216,185,157);const e=new i.Agj({x:this.width/2,y:this.height/4});e.graphics.add(R.Load.LevelTable.toSprite()),this.add(e),this.add(new j(this.width/2+2,58,56,`Level  ${this.levelId+1}`,j.WHITE).actor);const s=1==this.starsGained?"Good start!":2==this.starsGained?"Well done!":"Barista Master <3";this.add(new j(this.width/2+2,78,56,s,j.GREY).actor);for(let t=1;t<=3;t++){const e=t<=this.starsGained?R.Load.StarGold:R.Load.StarGrey,s=new i.Agj({x:this.width/2+25*(t-2),y:this.height/2});s.graphics.add(e.toSprite()),this.add(s)}this.add(new j(this.width/2-17,115,35,`- Points: ${this.statistics.pointsGained}`,j.WHITE,i.nOB.Left).actor),this.add(new j(this.width/2-17,120,35,`- Customers served: ${this.statistics.customersServed}`,j.WHITE,i.nOB.Left).actor),this.add(new j(this.width/2-17,125,35,`- Longest wait: ${this.statistics.customerLongestWait} s`,j.WHITE,i.nOB.Left).actor),this.add(new j(this.width/2,150,40,"Press [T] to TRY AGAIN",j.GREY).actor),this.add(new j(this.width/2,160,40,"Press [N] to play NEXT LEVEL",j.GREY).actor)}onPreUpdate(t,e){t.input.keyboard.wasPressed(i.D$R.T)&&this.game.showCurrentLevel(),t.input.keyboard.wasPressed(i.D$R.N)&&this.game.showNextLevel()}onDeactivate(t){this.scaler.deactivate()}}class X extends i.Agj{constructor(t,e){super({pos:(0,i.t6s)(t,e),z:100,width:25,height:25,color:new i.Q1f(255,255,255),collisionType:i.Bpo.Passive,collider:i.ypk.Box(32,32)}),this.GRAVITY=3e3,this.JUMP_GRAVITY=.5*this.GRAVITY,this.MAX_VELOCITY=300,this.ACCELERATION=700,this.TURN_ACCELERATION=4*this.ACCELERATION,this.AIR_MOVEMENT_PENALITY=.75,this.JUMP_FORCE=430,this.isOnWheel=!1,this.runningDirection=0,this.lastGroundState=!1,this.isOnGround=!1,this.isPressingDown=!1,this.isOnSolidPlatform=!1,this.carryingItem=null,this.animations={run:i.X55.fromSpriteSheet(i.FLG.fromImageSource({image:R.Load.VeverkaRun,grid:{columns:1,rows:7,spriteWidth:128,spriteHeight:25}}),[0,1,2,3,4,5,6],50),flying:i.X55.fromSpriteSheet(i.FLG.fromImageSource({image:R.Load.VeverkaRun,grid:{columns:1,rows:7,spriteWidth:128,spriteHeight:25}}),[2,3],100),idle:i.X55.fromSpriteSheet(i.FLG.fromImageSource({image:R.Load.VeverkaIdle,grid:{columns:3,rows:1,spriteWidth:32,spriteHeight:32}}),[0,1,2,1],200)},R.Load.RunSound.volume=0,R.Load.RunSound.loop=!0,R.Load.RunSound.play()}onInitialize(t){t.input.keyboard.on("press",this.onKeyPress.bind(this))}onPostUpdate(t,e){const s=t.input.keyboard.wasPressed(i.D$R.W)||t.input.keyboard.wasPressed(i.D$R.Up),n=t.input.keyboard.isHeld(i.D$R.W)||t.input.keyboard.isHeld(i.D$R.Up);s&&R.Load.JumpSound.play(.35);const o=t.input.keyboard.isHeld(i.D$R.A)||t.input.keyboard.isHeld(i.D$R.Left),r=t.input.keyboard.isHeld(i.D$R.D)||t.input.keyboard.isHeld(i.D$R.Right);let h=Math.sign(this.vel.x);if(this.isPressingDown=t.input.keyboard.isHeld(i.D$R.S)||t.input.keyboard.isHeld(i.D$R.Down),o||r){let t=0;o&&(t-=1),r&&(t+=1);let e=(t!=h?this.TURN_ACCELERATION:this.ACCELERATION)*t;this.isOnGround||(e*=this.AIR_MOVEMENT_PENALITY),this.acc.x=e,this.runningDirection=t}else this.acc.x=0,this.vel.x*=.75,this.runningDirection=0;if(-1==this.runningDirection?this.graphics.flipHorizontal=!0:1==this.runningDirection&&(this.graphics.flipHorizontal=!1),this.vel.x=(0,i.qE8)(this.vel.x,-this.MAX_VELOCITY,this.MAX_VELOCITY),s&&this.isOnGround&&(this.vel.y=-this.JUMP_FORCE,this.isOnGround=!1,this.isOnWheel=!1),this.isPressingDown&&!this.isOnSolidPlatform&&(this.isOnGround=!1,this.isOnWheel=!1),n&&Math.sign(this.vel.y)<0?this.acc.y=this.JUMP_GRAVITY:this.acc.y=this.GRAVITY,this.isOnGround?this.isOnWheel?0==this.runningDirection?(this.graphics.use(this.animations.idle),this.graphics.offset=(0,i.t6s)(0,0),this.updateItemPosition("hand")):(this.graphics.use(this.animations.run),this.graphics.offset=(0,i.t6s)(0,4),this.updateItemPosition("back")):Math.abs(this.vel.x)<50?(this.graphics.use(this.animations.idle),this.graphics.offset=(0,i.t6s)(0,0),this.updateItemPosition("hand")):(this.graphics.use(this.animations.run),this.graphics.offset=(0,i.t6s)(0,4),this.updateItemPosition("back")):(this.graphics.use(this.animations.flying),this.graphics.offset=(0,i.t6s)(0,4),this.updateItemPosition("back")),this.isOnGround&&(this.acc.y=0,this.vel.y=0),this.isOnWheel&&(this.acc.x=0,this.vel.x=0),this.lastGroundState=this.isOnGround,this.isOnWheel)0==this.runningDirection?R.Load.RunSound.volume=0:R.Load.RunSound.volume=.25;else{let t;t=this.isOnGround?Math.min(Math.abs(this.vel.x)/this.MAX_VELOCITY*2,1):0,R.Load.RunSound.volume=.25*t}}onCollisionStart(t,e,s,n){const o=e.owner.get(i.Yfw);(null==o?void 0:o.collisionType)!==i.Bpo.Fixed&&(null==o?void 0:o.collisionType)!==i.Bpo.Passive||(s===i.mnM.Bottom&&!this.isPressingDown&&o.owner instanceof J||o.owner instanceof K)&&(this.isOnGround=!0,o.owner instanceof Z&&(this.isOnWheel=!0,this.pos.x=e.center.x),this.pos.y=e.getFurthestPoint((0,i.t6s)(0,-1)).y-t.bounds.height/2+.1)}onCollisionEnd(t,e,s,n){super.onCollisionEnd(t,e,s,n);const o=e.owner.get(i.Yfw);(null==o?void 0:o.owner)instanceof J&&o.pos.y>this.pos.y&&(this.isOnGround=!1)}onKeyPress(t){t.key===i.pde.Keys.Space&&this.dropItem()}isCarryingItem(){return null!=this.carryingItem}pickUpItem(t){this.carryingItem=t,t.body.collisionType=i.Bpo.Passive,this.addChild(this.carryingItem)}dropItem(){var t;this.carryingItem&&(this.removeChild(this.carryingItem),this.carryingItem.pos=this.pos.clone().add(this.carryingItem.offset),this.carryingItem.vel=i.t6s(this.vel.x/5,this.vel.y/10),this.carryingItem.body.collisionType=i.Bpo.Active,this.carryingItem.offset=(0,i.t6s)(0,0),null===(t=this.scene)||void 0===t||t.add(this.carryingItem),this.carryingItem=null)}updateItemPosition(t){let e=this.graphics.flipHorizontal,s=this.graphics.current._currentFrame,n=Math.sin(s),o=(0,i.t6s)(e?-10:10,3+n),r=(0,i.t6s)(e?-20:20,6+n);null!=this.carryingItem&&(this.carryingItem.graphics.flipHorizontal=e,this.carryingItem.offset="hand"==t?o:r)}}class J extends i.Agj{constructor(t,e,s,n,o=0,r=i.Bpo.Passive){super({pos:i.t6s(t,e),width:s,height:n,color:i.Q1f.Transparent,collisionType:r}),this.rotation=o,25==s&&this.graphics.use(R.Load.PlatformWheel.toSprite()),30==s?this.graphics.use(R.Load.PlatformSmall.toSprite()):60==s&&this.graphics.use(R.Load.PlatformMedium.toSprite())}}class K extends J{onCollisionStart(t,e,s,n){const o=e.owner.get(i.Yfw);o.owner instanceof X&&(o.owner.isOnSolidPlatform=!0,o.owner.isOnGround=!0)}onCollisionEnd(t,e,s,n){if(null==e.owner)return;const o=e.owner.get(i.Yfw);o.owner instanceof X&&(o.owner.isOnSolidPlatform=!1)}}class Z extends J{constructor(){super(...arguments),this.isOnPlayform=!1,this.direction=0}onPostUpdate(t,e){this.playerReference&&this.playerReference.isOnGround&&(this.direction=this.playerReference.runningDirection,this.isOnPlayform=this.playerReference.isOnWheel)}onCollisionStart(t,e,s,n){const o=e.owner.get(i.Yfw);o.owner instanceof X&&(this.playerReference=o.owner)}onCollisionEnd(t,e,s,n){e.owner.get(i.Yfw).owner instanceof X&&(this.playerReference=void 0,this.direction=0)}}class q extends i.Agj{constructor(t,e,s,n){super({pos:i.t6s(t,e)}),this.linkedMachine=n,this.wheel=new i.Agj({radius:s,color:i.Q1f.Gray,scale:(0,i.t6s)(1.1,1.1)}),this.wheel.graphics.use(R.Load.Wheel.toSprite());this.platform=new Z(0,s+5,25,10),this.addChild(this.wheel),this.addChild(this.platform)}onPostUpdate(t,e){0!=this.platform.direction&&this.platform.isOnPlayform&&(this.wheel.actions.rotateBy(this.platform.direction/20,100),null!=this.linkedMachine&&(this.linkedMachine.remainingProcessingTime=Math.max(this.linkedMachine.remainingProcessingTime-e/1e3,0)))}}class tt extends i.Agj{constructor(t,e,s){super({pos:i.t6s(t,e-16),width:32,height:32,color:i.Q1f.Yellow,collisionType:i.Bpo.PreventCollision,z:5}),this.animations={run:i.X55.fromSpriteSheet(i.FLG.fromImageSource({image:R.Load.VeverkaRun,grid:{columns:1,rows:7,spriteWidth:128,spriteHeight:25}}),[0,1,2,3,4,5,6],100),flying:i.X55.fromSpriteSheet(i.FLG.fromImageSource({image:R.Load.VeverkaRun,grid:{columns:1,rows:7,spriteWidth:128,spriteHeight:25}}),[2,3],100),idle:i.X55.fromSpriteSheet(i.FLG.fromImageSource({image:R.Load.VeverkaIdle,grid:{columns:3,rows:1,spriteWidth:32,spriteHeight:32}}),[0,1,2],200)},this.satisfied=!1,this.assignedItem=null,this.runningDirection=null,this.runningTarget=null,this.carryingItem=null,this.desiredItem=s,this.bubble=new i.Agj({pos:i.t6s(0,-16),offset:i.t6s(0,-16),width:32,height:32,collisionType:i.Bpo.PreventCollision,z:5}),this.bubble.graphics.use(R.Load.Bubble.toSprite()),this.bubble.scale=(0,i.t6s)(1,1);let o=new n(s.item);o.pos=(0,i.t6s)(0,-18),o.body.collisionType=i.Bpo.PreventCollision,o.z=10,this.bubble.addChild(o),this.addChild(this.bubble)}pickUpItem(t){this.carryingItem=t,t.body.collisionType=i.Bpo.PreventCollision,t.pos=(0,i.t6s)(0,0),t.vel=(0,i.t6s)(0,0),t.angularVelocity=0,t.rotation=0,this.addChild(this.carryingItem),this.bubble.actions.scaleTo((0,i.t6s)(0,0),(0,i.t6s)(5,10))}updateBubblePosition(){let t=this.graphics.current._currentFrame,e=Math.sin(t);this.bubble.pos=i.t6s(0,-16+e)}updateItemPosition(t){let e=this.graphics.flipHorizontal,s=this.graphics.current._currentFrame,n=Math.sin(s),o=(0,i.t6s)(e?-10:10,3+n),r=(0,i.t6s)(e?-20:20,7+n);null!=this.carryingItem&&(this.carryingItem.graphics.flipHorizontal=e,this.carryingItem.offset="hand"==t?o:r)}onPostUpdate(t,e){null!==this.runningTarget?(this.runningDirection=Math.sign(this.runningTarget-this.pos.x),Math.abs(this.runningTarget-this.pos.x)<tt.PICK_UP_THRESHOLD&&(this.runningTarget=null,this.assignedItem&&(this.satisfied=!0,this.pickUpItem(this.assignedItem),this.goTo(1e4)))):this.satisfied||(this.runningDirection=null),this.satisfied&&this.pos.x>t.drawWidth+this.width&&(console.log("Killing customer"),this.kill()),null!==this.runningDirection?this.acc.x=tt.ACCELERATION*this.runningDirection:(this.acc.x=0,this.vel.x*=.75),-1==this.runningDirection?(this.graphics.flipHorizontal=!0,this.graphics.use(this.animations.run),this.graphics.offset=(0,i.t6s)(0,4),this.updateItemPosition("back")):1==this.runningDirection?(this.graphics.flipHorizontal=!1,this.graphics.use(this.animations.run),this.graphics.offset=(0,i.t6s)(0,4),this.updateItemPosition("back")):(this.graphics.use(this.animations.idle),this.graphics.offset=(0,i.t6s)(0,0),this.updateItemPosition("hand")),this.vel.x=(0,i.qE8)(this.vel.x,-tt.MAX_VELOCITY,tt.MAX_VELOCITY),this.updateBubblePosition()}goFetchItem(t){this.runningTarget=t.pos.x,this.assignedItem=t,t.allocatedToCustomer=!0}goTo(t){this.runningTarget=t}productAssigned(){return null!=this.assignedItem}}tt.MAX_VELOCITY=300,tt.ACCELERATION=700,tt.PICK_UP_THRESHOLD=25;class et extends i.Agj{constructor(t,e,s,n,o,r=80){super({pos:(0,i.t6s)(e,s),height:r,width:n,color:i.Q1f.Transparent,collisionType:i.Bpo.Passive}),this.customers=[],this.pendingProducts=[],this.mainScene=t,this.desiredItems=o}sampleItem(){const t=[];this.desiredItems.reduce(((e,s,i)=>(t[i]=e+s.distribution,t[i])),0);const e=Math.random()*t[t.length-1];return this.desiredItems[t.findIndex((t=>e<t))]}onInitialize(t){this.scheduleCustomersRefresh(t)}scheduleCustomersRefresh(t){const e=Math.random()*(et.MAX_TIMEOUT-et.MIN_TIMEOUT)+et.MIN_TIMEOUT,s=this.mainScene;null!==s&&setTimeout((()=>{this.customers=this.customers.filter((t=>!t.isKilled()));let e=this.customers.filter((t=>!t.productAssigned()));if(e.length<et.MAX_WAITING_CUSTOMERS){console.log("Adding customer.");const t=this.sampleItem(),i=this.width+et.CUSTOMER_OFFSET,n=new tt(i,this.pos.y-10,t);Math.random()<.5?R.Load.Chirp1Sound.play(.5):R.Load.Chirp2Sound.play(.5),this.customers.push(n),e=this.customers.filter((t=>!t.productAssigned()));for(let t=0;t<e.length;t++)e[t].goTo(this.width-et.CUSTOMER_OFFSET*(e.length-t));s.add(n)}this.scheduleCustomersRefresh(t)}),e)}onCollisionStart(t,e,s,i){const o=e.owner;if(!(o instanceof n))return;if(o.allocatedToCustomer)return;let r=o.item;const h=this.customers.find((t=>!t.satisfied&&!t.productAssigned()&&Object.getPrototypeOf(t.desiredItem.item)==Object.getPrototypeOf(r)));h?h.goFetchItem(o):(this.pendingProducts.push(o),console.log(o),setTimeout((()=>{this.pendingProducts.includes(o)&&!o.allocatedToCustomer&&(this.pendingProducts=this.pendingProducts.filter((t=>t!==o)),o.actions.fade(0,1e3).callMethod((()=>{o.kill()})))}),et.ITEM_TIMEOUT))}}et.HEIGHT=100,et.MIN_TIMEOUT=1e3,et.MAX_TIMEOUT=3e3,et.MAX_WAITING_CUSTOMERS=2,et.ITEM_TIMEOUT=5e3,et.CUSTOMER_OFFSET=40;class st extends i.Agj{constructor(t,e=!1,s){super({color:i.Q1f.Gray,collisionType:i.Bpo.Fixed,...t}),this.isOn=!0,this.itemQueue=[],this.blacklistedItemQueue=[],this.isProcessing=!1,this.remainingProcessingTime=0,this.maxProcessingTime=1.5,this.manual=e,this.sound=s,this.tooltip=new i.JU7({text:"",pos:(0,i.t6s)(0,5),font:new i.KQV({textAlign:i.nOB.Center,baseAlign:i.vhs.Middle,shadow:{blur:5,offset:(0,i.t6s)(0,0),color:i.Q1f.Black},family:"Silkscreen",size:15,unit:i.yRQ.Px,color:i.Q1f.White,smoothing:!1})}),this.tooltip.z=1e3;let[o,r]=this.getIntake();this.intakeActor=new i.Agj({pos:o.add(r).scale(.5),width:r.x-o.x,height:r.y-o.y,collisionType:i.Bpo.Fixed,color:i.Q1f.Transparent}),this.intakeActor.on("collisionstart",(t=>{if(this.isOn&&t.other instanceof n){const e=t.other;this.itemQueue.includes(e)||this.blacklistedItemQueue.includes(e)||this.itemQueue.push(e)}})),this.addChild(this.intakeActor),this.addChild(this.tooltip)}onPostUpdate(t,e){var s,o,r;if(this.isProcessing)if(this.remainingProcessingTime<=0){const t=this.itemQueue.shift();t.kill(),this.isProcessing=!1,null===(o=this.sound)||void 0===o||o.stop(),this.remainingProcessingTime=0,this.tooltip.text="";let e=this.processItem(t.item);e||(e=new B);const s=new n(e);s.pos=this.getOutlet().add(this.pos),s.vel=(0,i.t6s)(Math.random(),10),this.blacklistedItemQueue.push(s),null===(r=this.scene)||void 0===r||r.add(s)}else this.manual||(this.remainingProcessingTime=Math.max(this.remainingProcessingTime-e/1e3,0)),this.tooltip.text=`${this.remainingProcessingTime.toFixed(1)}`;else 0!=this.itemQueue.length&&(this.isProcessing=!0,this.remainingProcessingTime=this.maxProcessingTime,this.tooltip.text=`${this.remainingProcessingTime.toFixed(1)}`,null===(s=this.sound)||void 0===s||s.play(.5))}}class it extends st{getSprite(){const t=R.Machines().getSprite(2,0);return t.scale=(0,i.t6s)(.22,.22),t}constructor(t,e){super({pos:(0,i.t6s)(t,e),z:1},!1,R.Load.BrewerSound),this.graphics.use(R.Machines().getSprite(2,0)),this.collider.set(new i.ElT([i.ypk.Box(45,16,void 0,(0,i.t6s)(0,-6)),i.ypk.Polygon([(0,i.t6s)(10,1),(0,i.t6s)(14,21),(0,i.t6s)(15,21),(0,i.t6s)(11,0)],(0,i.t6s)(-24,-35)),i.ypk.Polygon([(0,i.t6s)(43,1),(0,i.t6s)(42,0),(0,i.t6s)(39,21),(0,i.t6s)(40,21)],(0,i.t6s)(-24,-35))]))}processItem(t){return t.brew?t.brew():null}getIntake(){return[(0,i.t6s)(-8,-16),(0,i.t6s)(8,-4)]}getOutlet(){return(0,i.t6s)(0,10)}}class nt extends i.Agj{constructor(t,e,s=0){super({pos:t,rotation:s/180*Math.PI,width:e.x,height:e.y,collisionType:i.Bpo.Fixed})}}class ot extends st{getSprite(){const t=R.Machines().getSprite(0,0);return t.scale=(0,i.t6s)(.22,.22),t}constructor(t,e){super({pos:(0,i.t6s)(t,e),z:1},!0),this.grindedLastTick=!0,this.graphics.add(R.Machines().getSprite(0,0)),this.collider.set(new i.VQc({radius:16,offset:(0,i.t6s)(0,6)})),this.crank=new i.Agj({pos:(0,i.t6s)(.5,5),z:this.z+1});const s=R.Machines().getSprite(1,0);this.crank.graphics.add(s),this.addChild(this.crank),this.addChild(new nt((0,i.t6s)(-11,-18),(0,i.t6s)(27,2),75)),this.addChild(new nt((0,i.t6s)(12,-18),(0,i.t6s)(27,2),-75))}onPostUpdate(t,e){super.onPostUpdate(t,e);let s=!1;if(this.isOn){let t=this.crank.rotation;this.crank.rotation=-this.remainingProcessingTime/this.maxProcessingTime*Math.PI*2,t!=this.crank.rotation?s=!0:this.grindedLastTick=!1}s?this.grindedLastTick||(R.Load.GrinderSound.seek(this.maxProcessingTime-this.remainingProcessingTime),R.Load.GrinderSound.play(.5)):R.Load.GrinderSound.stop(),this.grindedLastTick=s}processItem(t){return t.grind?t.grind():null}getIntake(){return[(0,i.t6s)(-5,-10),(0,i.t6s)(5,-5)]}getOutlet(){return(0,i.t6s)(.5,10)}}class rt extends i.Agj{constructor(t,e,s,o){super({x:t,y:e,width:s,height:s,color:i.Q1f.Gray,collisionType:i.Bpo.Passive}),this.cooldownTimer=0,this.isOnCooldown=!1,this.COOLDOWN=3,this.item=o,this.tooltip=new i.JU7({text:"Space",pos:(0,i.t6s)(0,-s/2-6),font:new i.KQV({textAlign:i.nOB.Center,baseAlign:i.vhs.Bottom,shadow:{blur:5,offset:(0,i.t6s)(0,0),color:i.Q1f.Black},family:"Silkscreen",size:15,unit:i.yRQ.Px,color:i.Q1f.White,smoothing:!1})}),this.tooltip.scale=(0,i.t6s)(0,0);let r=new n(o);r.body.collisionType=i.Bpo.PreventCollision,this.addChild(this.tooltip),this.addChild(r),r.scale=(0,i.t6s)(.8,.8),this.graphics.use(R.Load.ResourceStation.toSprite())}onPostUpdate(t,e){const s=t.input.keyboard.wasPressed(i.D$R.Space);this.isOnCooldown?(this.cooldownTimer-=e/1e3,this.cooldownTimer<=0?(this.isOnCooldown=!1,this.tooltip.text="Space"):(this.tooltip.text=`${this.cooldownTimer.toFixed(1)}`,this.tooltip.graphics.opacity=.5)):this.playerReference&&(this.playerReference.isCarryingItem()?this.tooltip.graphics.opacity=.5:this.tooltip.graphics.opacity=1,!s||this.playerReference.isCarryingItem()||this.isOnCooldown||(this.playerReference.pickUpItem(new n(this.item)),this.isOnCooldown=!0,this.cooldownTimer=this.COOLDOWN,this.tooltip.text=`${this.COOLDOWN.toFixed(1)}`,this.actions.delay(1e3*this.COOLDOWN).callMethod((()=>{null==this.playerReference&&this.tooltip.actions.scaleTo((0,i.t6s)(0,0),(0,i.t6s)(10,20)).callMethod((()=>{this.tooltip.text="Space"}))}))))}onCollisionStart(t,e,s,n){const o=e.owner.get(i.Yfw);o.owner instanceof X&&(this.playerReference=o.owner,this.tooltip.actions.scaleTo((0,i.t6s)(1,1),(0,i.t6s)(10,20)))}onCollisionEnd(t,e,s,n){e.owner.get(i.Yfw).owner instanceof X&&(this.playerReference=void 0,this.isOnCooldown||this.tooltip.actions.scaleTo((0,i.t6s)(0,0),(0,i.t6s)(10,20)))}}const ht=rt;const at=[new class{constructor(){this.timeLimitMs=3e5,this.maxPoints=100,this.size=Object.freeze((0,i.t6s)(400,400)),this.getDesiredItems=()=>[{item:new _,distribution:.6,price:10},{item:new z,distribution:.4,price:15}]}getNewRecipes(){return[new F(new D,new ot(0,0),new G),new F(new G,new it(0,0),new z)]}spawnItems(t){let{x:e,y:s}=this.size;[new K(e/2,200,e,20),new K(e/2,s,e,20,0,i.Bpo.Fixed),new J(210,150,60,10),new J(320,150,60,10),new J(this.size.x/2+5,310,30,10,-Math.PI/5,i.Bpo.Fixed)].forEach((e=>t.add(e))),[new ht(320,130,30,new D)].forEach((e=>t.add(e)));const n=new X(this.size.x/2,180);t.add(n);const o=new ot(this.size.x/2,260);t.add(o);const r=new it(this.size.x/2-30,360);t.add(r);const h=new q(90,110,50,o);t.add(h);const a=new i.Agj({z:-10});a.graphics.use(R.Load.Background.toSprite(),{anchor:(0,i.t6s)(0,0),offset:(0,i.t6s)(-50,0)}),t.add(a);const l=new et(t,this.size.x/2,this.size.y,this.size.x,this.getDesiredItems());t.add(l)}}];class lt extends i.N$8{constructor(){super({displayMode:i.q5Z.FillScreen,antialiasing:!1}),this.curLevelId=0,this.isShowDebug=!1,this.debug.collider.boundsColor=i.Q1f.Red,this.debug.collider.showAll=!0}start(){this.debug.collider.showBounds=!0;const t=new i.aHM(Object.values(R.Load));return super.start(t)}restart(){this.goToScene("idle").then((()=>{this.removeScene(this.mainScene),this.showCurrentLevel()}))}onStart(){this.addScene("start",new $(this)),this.goToScene("start")}showLevelIntro(){this.addScene("intro",new Y(this,at[this.curLevelId],this.curLevelId)),this.goToScene("intro")}showLevelOutro(t){this.addScene("outro",new V(this,this.curLevelId,t)),this.goToScene("outro")}showNextLevel(){this.curLevelId++,this.curLevelId>=at.length?this.restart():this.showCurrentLevel()}showCurrentLevel(){this.addScene("main",new H(this,at[this.curLevelId])),R.Load.MainMusic.isPlaying()||R.Load.MainMusic.play(.15),this.goToScene("main")}showPause(){this.addScene("pause",new Y(this,at[this.curLevelId],this.curLevelId,!0)),R.Load.MainMusic.pause(),this.goToScene("pause")}exitPause(){R.Load.MainMusic.isPlaying()||R.Load.MainMusic.play(.15),this.goToScene("main")}onPreUpdate(t,e){t.input.keyboard.wasPressed(i.D$R.R)&&this.restart(),t.input.keyboard.wasPressed(i.D$R.F4)&&(this.isShowDebug=!this.isShowDebug,this.showDebug(this.isShowDebug))}}const dt=new lt;dt.start().then((()=>{dt.onStart()}))},676:(t,e,s)=>{t.exports=s.p+"0e7db2bf0e12a5aeaf30.mp3"},601:(t,e,s)=>{t.exports=s.p+"54c91bc04ccbf4034fdd.mp3"},30:(t,e,s)=>{t.exports=s.p+"6c709135a0cf7ae56322.mp3"},987:(t,e,s)=>{t.exports=s.p+"f7c4e170987a017d2460.mp3"},735:(t,e,s)=>{t.exports=s.p+"9469fff652985ec3dd33.mp3"},820:(t,e,s)=>{t.exports=s.p+"e8132081b42833ec6be4.mp3"},315:(t,e,s)=>{t.exports=s.p+"3042316294626ee55c95.mp3"},945:(t,e,s)=>{t.exports=s.p+"a4de085ac226e8b11d95.mp3"}},s={};function i(t){var n=s[t];if(void 0!==n)return n.exports;var o=s[t]={exports:{}};return e[t](o,o.exports,i),o.exports}i.m=e,t=[],i.O=(e,s,n,o)=>{if(!s){var r=1/0;for(d=0;d<t.length;d++){for(var[s,n,o]=t[d],h=!0,a=0;a<s.length;a++)(!1&o||r>=o)&&Object.keys(i.O).every((t=>i.O[t](s[a])))?s.splice(a--,1):(h=!1,o<r&&(r=o));if(h){t.splice(d--,1);var l=n();void 0!==l&&(e=l)}}return e}o=o||0;for(var d=t.length;d>0&&t[d-1][2]>o;d--)t[d]=t[d-1];t[d]=[s,n,o]},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t;i.g.importScripts&&(t=i.g.location+"");var e=i.g.document;if(!t&&e&&(e.currentScript&&"SCRIPT"===e.currentScript.tagName.toUpperCase()&&(t=e.currentScript.src),!t)){var s=e.getElementsByTagName("script");if(s.length)for(var n=s.length-1;n>-1&&(!t||!/^http(s?):/.test(t));)t=s[n--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=t})(),(()=>{var t={792:0};i.O.j=e=>0===t[e];var e=(e,s)=>{var n,o,[r,h,a]=s,l=0;if(r.some((e=>0!==t[e]))){for(n in h)i.o(h,n)&&(i.m[n]=h[n]);if(a)var d=a(i)}for(e&&e(s);l<r.length;l++)o=r[l],i.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return i.O(d)},s=self.webpackChunkexcalibur_webpack=self.webpackChunkexcalibur_webpack||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var n=i.O(void 0,[128],(()=>i(841)));n=i.O(n)})();
//# sourceMappingURL=main.js.map