(()=>{"use strict";var t,e={957:(t,e,i)=>{var s=i(128);class n extends s.Agj{constructor(t,e){super({radius:6,collisionType:s.Bpo.Active,z:10}),this.item=t,this.allocatedToCustomer=!1,e&&(this.pos=e.clone()),this.graphics.use(t.getSprite())}onPostUpdate(t,e){this.angularVelocity=this.vel.x/10,this.vel.x*=.99}}const o=i.p+"ce7496ad1af705d6ccee.png",r=i.p+"5de335bc34b557ac0a77.png",h=i.p+"084f6b4bd78bf012dc1c.png",a=i.p+"729b4d40d9b9a6b03d18.png",l=i.p+"fe80bbd024bed2d313e0.png",d=i.p+"317f0b8d7d7127116e52.png",c=i.p+"70ee555527104bb6766c.png",p=i.p+"48fff0201b6ff88f6844.png",u=i.p+"8b541599a7ea78270c3a.png",g=i.p+"5a2e7bc780c15f39858a.png",m=i.p+"27e85399b3457c32315e.png",w=i.p+"c741eb1859a35ce438d8.png",f=i.p+"7317fe13d3b7079227bb.png",y=i.p+"f1fecf680904d2a3d503.png",I=i.p+"6aaa2bfde529973c90c3.png",b=i.p+"baebf4fddc780da41f69.png",S=i.p+"775e95897a9d85eda888.png",P=i.p+"6adca5ff387053b536c6.png";var T=i(945),v=i(820),x=i(987),O=i(601),L=i(30),C=i(315),E=i(735);const A=new class{constructor(){this.Load={Sword:new s.bEs(o),Magor:new s.bEs(r),VeverkaRun:new s.bEs(a),VeverkaIdle:new s.bEs(l),ItemsImg:new s.bEs(w),Logo:new s.bEs(d),Lever:new s.bEs(c),PlatformSmall:new s.bEs(p),PlatformMedium:new s.bEs(u),PlatformWheel:new s.bEs(g),ResourceStation:new s.bEs(P),Wheel:new s.bEs(m),Button:new s.bEs(h),Machines:new s.bEs(f),LevelTable:new s.bEs(y),StarGold:new s.bEs(I),StarGrey:new s.bEs(b),Bubble:new s.bEs(S),JumpSound:new s.ABN(v),RunSound:new s.ABN(T),Chirp1Sound:new s.ABN(O),Chirp2Sound:new s.ABN(L),DropSound:new s.ABN(x),MainMusic:new s.ABN(C),GrinderSound:new s.ABN(E)},this.Items=R((()=>s.FLG.fromImageSource({image:this.Load.ItemsImg,grid:{columns:8,rows:8,spriteHeight:16,spriteWidth:16}}))),this.Machines=R((()=>s.FLG.fromImageSource({image:this.Load.Machines,grid:{columns:8,rows:5,spriteWidth:48,spriteHeight:70}})))}};function R(t){let e;return()=>(e=t(),e)}class k{getSprite(){return A.Items().getSprite(3,0)}grind(){return new U}}class M{getSprite(){return A.Items().getSprite(0,0)}grind(){return new D}roast(){return new B}}class D{getSprite(){return A.Items().getSprite(1,0)}brew(){return new G}roast(){return new z}}class G{getSprite(){return A.Items().getSprite(2,0)}}class B{getSprite(){return A.Items().getSprite(0,1)}}class z{getSprite(){return A.Items().getSprite(0,2)}}class U{getSprite(){return A.Items().getSprite(4,0)}brew(){return new W}}class W{getSprite(){return A.Items().getSprite(5,0)}}class _{constructor(t,e){this.sizeInPixels=t,this.scene=e,this.handler=this.onScenePreDraw.bind(this),e.on("predraw",this.handler)}deactivate(){this.scene.off("predraw",this.handler)}onScenePreDraw(t){this.scene.camera.pos=this.sizeInPixels.scale(.5);const e=Math.min(window.innerWidth/this.sizeInPixels.x,window.innerHeight/this.sizeInPixels.y);this.scene.camera.zoom=e}}class H extends s.Agj{constructor(t,e){var i,n,o,r;super(),this.size=t;const{x:h,y:a}=t,l=10,d=[];(null===(i=null==e?void 0:e.top)||void 0===i||i)&&d.push(s.ypk.Box(h+20,l,(0,s.t6s)(0,0),(0,s.t6s)(0,-l))),(null===(n=null==e?void 0:e.down)||void 0===n||n)&&d.push(s.ypk.Box(h+20,l,(0,s.t6s)(0,0),(0,s.t6s)(0,a+l))),(null===(o=null==e?void 0:e.top)||void 0===o||o)&&d.push(s.ypk.Box(l,a,(0,s.t6s)(0,0),(0,s.t6s)(-l,0))),(null===(r=null==e?void 0:e.top)||void 0===r||r)&&d.push(s.ypk.Box(l,a,(0,s.t6s)(0,0),(0,s.t6s)(h+l,0))),this.collider.set(new s.ElT(d))}}class N extends s.Z58{constructor(t,e){super(),this.game=t,this.level=e,this.entityCounter=new s.JU7({text:""}),this.timeLabel=new s.JU7({text:""}),this.timePlayed=0,this.statistics={customersServed:0,customerLongestWait:0,pointsMax:0,pointsGained:0,recipesMade:0}}onInitialize(t){this.add(this.entityCounter),this.level.spawnItems(this),this.initializeClock();let e=t.input.pointers.primary;e.on("down",(t=>{console.log("spawn");let i=new n(new G);i.pos=e.lastWorldPos.clone(),this.add(i)})),this.physics.config.gravity=(0,s.t6s)(0,250),new _(this.level.size,this),this.add(new H(this.level.size))}initializeClock(){this.timeLabel=new s.JU7({text:"",pos:(0,s.t6s)(this.level.size.x,20),font:new s.KQV({textAlign:s.nOB.Left,baseAlign:s.vhs.Bottom,family:"Pixelify Sans",size:80,unit:s.yRQ.Px,color:s.Q1f.Black,smoothing:!1}),scale:(0,s.t6s)(1,1).scale(.2)}),this.add(this.timeLabel),this.add(new s.JU7({text:"[P] to PAUSE",pos:(0,s.t6s)(this.level.size.x,30),font:new s.KQV({textAlign:s.nOB.Left,baseAlign:s.vhs.Bottom,family:"Pixelify Sans",size:35,unit:s.yRQ.Px,color:s.Q1f.Black,smoothing:!1}),scale:(0,s.t6s)(1,1).scale(.2)}))}onPreDraw(t,e){this.entityCounter.text=`Entities: ${this.entities.length}`;const i=this.level.timeLimitMs-this.timePlayed,s=Math.floor(i/6e4),n=Math.floor((i-60*s*1e3)/1e3);this.timeLabel.text=`${s<10?"0"+s:s}:${n<10?"0"+n:n}`}onPreUpdate(t,e){this.timePlayed+=e,this.timePlayed>=this.level.timeLimitMs&&(this.statistics.pointsMax=200,this.statistics.pointsGained=130,this.game.showLevelOutro(this.statistics)),t.input.keyboard.wasPressed(s.D$R.P)&&this.game.showPause()}}class Q{constructor(t,e,i,n,o=Q.GREY,r=s.nOB.Center){const h=new s.EYj({text:n,font:new s.KQV({textAlign:r,baseAlign:s.vhs.Bottom,family:"Pixelify Sans",size:i,unit:s.yRQ.Px,color:o,smoothing:!1})});h.scale=(0,s.t6s)(1,1).scale(.1),this._actor=new s.Agj,this._actor.graphics.use(h),this.actor.pos=(0,s.t6s)(t+h.width/2,e)}get actor(){return this._actor}}Q.WHITE=new s.Q1f(255,255,255),Q.GREY=new s.Q1f(46,46,46),Q.ORANGE=new s.Q1f(242,157,79);class F{constructor(t,e,i){this.ingredient1=t,this.ingredient2=e,this.result=i}show(t,e,i){const o=A.Items().getSprite(0,2),r=A.Items().getSprite(1,2),h=new s.Agj({pos:(0,s.t6s)(e,i)});h.graphics.add(this.ingredient1.getSprite()),t.add(h);const a=new s.Agj({pos:(0,s.t6s)(e+16,i)});a.graphics.add(o),t.add(a);const l=new s.Agj({pos:(0,s.t6s)(e+32,i)});l.graphics.add(this.ingredient2.getSprite()),t.add(l);const d=new s.Agj({pos:(0,s.t6s)(e+48,i)});d.graphics.add(r),t.add(d);const c=new n(this.result,(0,s.t6s)(e+64,i));c.body.collisionType=s.Bpo.PreventCollision,c.graphics.add(this.result.getSprite()),t.add(c)}}class j extends s.Z58{constructor(t,e,i,n=!1){super(),this.game=t,this.level=e,this.levelId=i,this.paused=n,this.height=180,this.width=180,this.scaler=new _((0,s.t6s)(this.width,this.height),this),this.hintText=new s.Agj}onInitialize(t){this.backgroundColor=new s.Q1f(216,185,157);const e=new s.Agj({x:this.width/2,y:this.height/4});e.graphics.add(A.Load.LevelTable.toSprite()),this.add(e),this.add(new Q(this.width/2+2,58,56,`Level  ${this.levelId+1}`,Q.WHITE).actor),this.hintText=new Q(this.width/2,75,40,"Want a little hint?",Q.WHITE).actor,this.add(this.hintText),this.showHint(),this.paused?(this.add(new Q(this.width/2,this.height/2+50,70,"PAUSED",Q.GREY).actor),this.add(new Q(this.width/2,this.height/2+60,40,"Press [SPACE] to continue",Q.GREY).actor)):this.add(new Q(this.width/2,this.height/2+60,40,"Press [SPACE] to play",Q.GREY).actor)}showHint(){const t=this.level.getNewRecipes();for(let e=0;e<t.length;e++){t[e].show(this,this.width/2-32,this.height/2-10+16*e+5)}}onPreUpdate(t,e){t.input.keyboard.wasPressed(s.D$R.Space)&&(this.paused?this.game.exitPause():this.game.showCurrentLevel())}onDeactivate(t){this.scaler.deactivate()}}class Y extends s.Z58{constructor(t){super(),this.game=t,this.height=180,this.width=180,this.scaler=new _((0,s.t6s)(this.width,this.height),this)}onInitialize(t){this.backgroundColor=new s.Q1f(216,185,157);const e=new s.Agj({x:this.width/2,y:this.height/4});e.graphics.add(A.Load.Logo.toSprite()),this.add(e),this.add(new Q(this.width/2,this.height/2+20,56,"Your forest cafe awaits...\n Brew, Bake, Delight!").actor),this.add(new Q(this.width/2,this.height/2+60,40,"Press [SPACE] to play").actor)}onPreUpdate(t,e){t.input.keyboard.wasPressed(s.D$R.Space)&&this.game.showLevelIntro()}onDeactivate(t){this.scaler.deactivate()}}class $ extends s.Z58{constructor(t,e,i){super(),this.game=t,this.levelId=e,this.statistics=i;const n=i.pointsGained/i.pointsMax;this.starsGained=n<.33?1:n<.66?2:3,this.height=180,this.width=180,this.scaler=new _((0,s.t6s)(this.width,this.height),this)}onInitialize(t){this.backgroundColor=new s.Q1f(216,185,157);const e=new s.Agj({x:this.width/2,y:this.height/4});e.graphics.add(A.Load.LevelTable.toSprite()),this.add(e),this.add(new Q(this.width/2+2,58,56,`Level  ${this.levelId+1}`,Q.WHITE).actor);const i=1==this.starsGained?"Good start!":2==this.starsGained?"Well done!":"Barista Master <3";this.add(new Q(this.width/2+2,78,56,i,Q.GREY).actor);for(let t=1;t<=3;t++){const e=t<=this.starsGained?A.Load.StarGold:A.Load.StarGrey,i=new s.Agj({x:this.width/2+25*(t-2),y:this.height/2});i.graphics.add(e.toSprite()),this.add(i)}this.add(new Q(this.width/2-17,115,35,`- Points: ${this.statistics.pointsGained}`,Q.WHITE,s.nOB.Left).actor),this.add(new Q(this.width/2-17,120,35,`- Customers served: ${this.statistics.customersServed}`,Q.WHITE,s.nOB.Left).actor),this.add(new Q(this.width/2-17,125,35,`- Longest wait: ${this.statistics.customerLongestWait} s`,Q.WHITE,s.nOB.Left).actor),this.add(new Q(this.width/2,150,40,"Press [T] to TRY AGAIN",Q.GREY).actor),this.add(new Q(this.width/2,160,40,"Press [N] to play NEXT LEVEL",Q.GREY).actor)}onPreUpdate(t,e){t.input.keyboard.wasPressed(s.D$R.T)&&this.game.showCurrentLevel(),t.input.keyboard.wasPressed(s.D$R.N)&&this.game.showNextLevel()}onDeactivate(t){this.scaler.deactivate()}}class V extends s.Agj{constructor(t,e){super({pos:(0,s.t6s)(t,e),z:100,width:25,height:25,color:new s.Q1f(255,255,255),collisionType:s.Bpo.Passive,collider:s.ypk.Box(32,32)}),this.GRAVITY=3e3,this.JUMP_GRAVITY=.5*this.GRAVITY,this.MAX_VELOCITY=300,this.ACCELERATION=700,this.TURN_ACCELERATION=4*this.ACCELERATION,this.AIR_MOVEMENT_PENALITY=.75,this.JUMP_FORCE=430,this.isOnWheel=!1,this.runningDirection=0,this.lastGroundState=!1,this.isOnGround=!1,this.isPressingDown=!1,this.isOnSolidPlatform=!1,this.carryingItem=null,this.animations={run:s.X55.fromSpriteSheet(s.FLG.fromImageSource({image:A.Load.VeverkaRun,grid:{columns:1,rows:7,spriteWidth:128,spriteHeight:25}}),[0,1,2,3,4,5,6],50),flying:s.X55.fromSpriteSheet(s.FLG.fromImageSource({image:A.Load.VeverkaRun,grid:{columns:1,rows:7,spriteWidth:128,spriteHeight:25}}),[2,3],100),idle:s.X55.fromSpriteSheet(s.FLG.fromImageSource({image:A.Load.VeverkaIdle,grid:{columns:3,rows:1,spriteWidth:32,spriteHeight:32}}),[0,1,2,1],200)},A.Load.RunSound.volume=0,A.Load.RunSound.loop=!0,A.Load.RunSound.play()}onInitialize(t){t.input.keyboard.on("press",this.onKeyPress.bind(this))}onPostUpdate(t,e){const i=t.input.keyboard.wasPressed(s.D$R.W)||t.input.keyboard.wasPressed(s.D$R.Up),n=t.input.keyboard.isHeld(s.D$R.W)||t.input.keyboard.isHeld(s.D$R.Up);i&&A.Load.JumpSound.play(.35);const o=t.input.keyboard.isHeld(s.D$R.A)||t.input.keyboard.isHeld(s.D$R.Left),r=t.input.keyboard.isHeld(s.D$R.D)||t.input.keyboard.isHeld(s.D$R.Right);let h=Math.sign(this.vel.x);if(this.isPressingDown=t.input.keyboard.isHeld(s.D$R.S)||t.input.keyboard.isHeld(s.D$R.Down),o||r){let t=0;o&&(t-=1),r&&(t+=1);let e=(t!=h?this.TURN_ACCELERATION:this.ACCELERATION)*t;this.isOnGround||(e*=this.AIR_MOVEMENT_PENALITY),this.acc.x=e,this.runningDirection=t}else this.acc.x=0,this.vel.x*=.75,this.runningDirection=0;if(-1==this.runningDirection?this.graphics.flipHorizontal=!0:1==this.runningDirection&&(this.graphics.flipHorizontal=!1),this.vel.x=(0,s.qE8)(this.vel.x,-this.MAX_VELOCITY,this.MAX_VELOCITY),i&&this.isOnGround&&(this.vel.y=-this.JUMP_FORCE,this.isOnGround=!1,this.isOnWheel=!1),this.isPressingDown&&!this.isOnSolidPlatform&&(this.isOnGround=!1,this.isOnWheel=!1),n&&Math.sign(this.vel.y)<0?this.acc.y=this.JUMP_GRAVITY:this.acc.y=this.GRAVITY,this.isOnGround?this.isOnWheel?0==this.runningDirection?(this.graphics.use(this.animations.idle),this.updateItemPosition("hand")):(this.graphics.use(this.animations.run),this.updateItemPosition("back")):Math.abs(this.vel.x)<50?(this.graphics.use(this.animations.idle),this.updateItemPosition("hand")):(this.graphics.use(this.animations.run),this.updateItemPosition("back")):(this.graphics.use(this.animations.flying),this.updateItemPosition("back")),this.isOnGround&&(this.acc.y=0,this.vel.y=0),this.isOnWheel&&(this.acc.x=0,this.vel.x=0),this.lastGroundState=this.isOnGround,this.isOnWheel)this.runningDirection&&(A.Load.RunSound.volume=.25);else{let t;t=this.isOnGround?Math.min(Math.abs(this.vel.x)/this.MAX_VELOCITY*2,1):0,A.Load.RunSound.volume=.25*t}}onCollisionStart(t,e,i,n){const o=e.owner.get(s.Yfw);(null==o?void 0:o.collisionType)!==s.Bpo.Fixed&&(null==o?void 0:o.collisionType)!==s.Bpo.Passive||(i===s.mnM.Bottom&&!this.isPressingDown&&o.owner instanceof X||o.owner instanceof J)&&(this.isOnGround=!0,o.owner instanceof K&&(this.isOnWheel=!0,this.pos.x=e.center.x),this.pos.y=e.getFurthestPoint((0,s.t6s)(0,-1)).y-t.bounds.height/2+.1)}onCollisionEnd(t,e,i,n){super.onCollisionEnd(t,e,i,n);const o=e.owner.get(s.Yfw);(null==o?void 0:o.owner)instanceof X&&o.pos.y>this.pos.y&&(this.isOnGround=!1)}onKeyPress(t){t.key===s.pde.Keys.Space&&this.dropItem()}isCarryingItem(){return null!=this.carryingItem}pickUpItem(t){this.carryingItem=t,t.body.collisionType=s.Bpo.Passive,this.addChild(this.carryingItem)}dropItem(){var t;this.carryingItem&&(this.removeChild(this.carryingItem),this.carryingItem.pos=this.pos.clone().add(this.carryingItem.offset),this.carryingItem.vel=s.t6s(this.vel.x/5,this.vel.y/10),this.carryingItem.body.collisionType=s.Bpo.Active,this.carryingItem.offset=(0,s.t6s)(0,0),null===(t=this.scene)||void 0===t||t.add(this.carryingItem),this.carryingItem=null)}updateItemPosition(t){let e=this.graphics.flipHorizontal,i=this.graphics.current._currentFrame,n=Math.sin(i),o=(0,s.t6s)(e?-10:10,3+n),r=(0,s.t6s)(e?-20:20,2+n);null!=this.carryingItem&&(this.carryingItem.graphics.flipHorizontal=e,this.carryingItem.offset="hand"==t?o:r)}}class X extends s.Agj{constructor(t,e,i,n,o=0,r=s.Bpo.Passive){super({pos:s.t6s(t,e),width:i,height:n,color:s.Q1f.DarkGray,collisionType:r}),this.rotation=o,25==i&&this.graphics.use(A.Load.PlatformWheel.toSprite()),30==i?this.graphics.use(A.Load.PlatformSmall.toSprite()):60==i&&this.graphics.use(A.Load.PlatformMedium.toSprite())}}class J extends X{onCollisionStart(t,e,i,n){const o=e.owner.get(s.Yfw);o.owner instanceof V&&(o.owner.isOnSolidPlatform=!0,o.owner.isOnGround=!0)}onCollisionEnd(t,e,i,n){if(null==e.owner)return;const o=e.owner.get(s.Yfw);o.owner instanceof V&&(o.owner.isOnSolidPlatform=!1)}}class K extends X{constructor(){super(...arguments),this.isOnPlayform=!1,this.direction=0}onPostUpdate(t,e){this.playerReference&&this.playerReference.isOnGround&&(this.direction=this.playerReference.runningDirection,this.isOnPlayform=this.playerReference.isOnWheel)}onCollisionStart(t,e,i,n){const o=e.owner.get(s.Yfw);o.owner instanceof V&&(this.playerReference=o.owner)}onCollisionEnd(t,e,i,n){e.owner.get(s.Yfw).owner instanceof V&&(this.playerReference=void 0,this.direction=0)}}class Z extends s.Agj{constructor(t,e,i,n){super({pos:s.t6s(t,e)}),this.linkedMachine=n,this.wheel=new s.Agj({radius:i,color:s.Q1f.Gray,scale:(0,s.t6s)(1.1,1.1)}),this.wheel.graphics.use(A.Load.Wheel.toSprite());this.platform=new K(0,i+5,25,10),this.addChild(this.wheel),this.addChild(this.platform)}onPostUpdate(t,e){0!=this.platform.direction&&this.platform.isOnPlayform&&(this.wheel.actions.rotateBy(this.platform.direction/20,100),null!=this.linkedMachine&&(this.linkedMachine.remainingProcessingTime=Math.max(this.linkedMachine.remainingProcessingTime-e/1e3,0)))}}class q extends s.Agj{constructor(t,e){super({pos:s.t6s(t,0),width:32,height:32,color:s.Q1f.Yellow,collisionType:s.Bpo.Passive,z:5}),this.animations={run:s.X55.fromSpriteSheet(s.FLG.fromImageSource({image:A.Load.VeverkaRun,grid:{columns:1,rows:7,spriteWidth:128,spriteHeight:25}}),[0,1,2,3,4,5,6],100),flying:s.X55.fromSpriteSheet(s.FLG.fromImageSource({image:A.Load.VeverkaRun,grid:{columns:1,rows:7,spriteWidth:128,spriteHeight:25}}),[2,3],100),idle:s.X55.fromSpriteSheet(s.FLG.fromImageSource({image:A.Load.VeverkaIdle,grid:{columns:3,rows:1,spriteWidth:32,spriteHeight:32}}),[0,1,2],200)},this.satisfied=!1,this.assignedItem=null,this.runningDirection=null,this.runningTarget=null,this.carryingItem=null,this.desiredItem=e,this.bubble=new s.Agj({pos:s.t6s(0,-16),offset:s.t6s(0,-16),width:32,height:32,collisionType:s.Bpo.PreventCollision,z:5}),this.bubble.graphics.use(A.Load.Bubble.toSprite()),this.bubble.scale=(0,s.t6s)(1,1);let i=new n(e.item);i.pos=(0,s.t6s)(0,-18),i.body.collisionType=s.Bpo.PreventCollision,i.z=10,this.bubble.addChild(i),this.addChild(this.bubble)}pickUpItem(t){this.carryingItem=t,t.body.collisionType=s.Bpo.PreventCollision,t.pos=(0,s.t6s)(0,0),t.vel=(0,s.t6s)(0,0),t.angularVelocity=0,t.rotation=0,this.addChild(this.carryingItem),this.bubble.actions.scaleTo((0,s.t6s)(0,0),(0,s.t6s)(5,10))}updateBubblePosition(){let t=this.graphics.current._currentFrame,e=Math.sin(t);this.bubble.pos=s.t6s(0,-16+e)}updateItemPosition(t){let e=this.graphics.flipHorizontal,i=this.graphics.current._currentFrame,n=Math.sin(i),o=(0,s.t6s)(e?-10:10,3+n),r=(0,s.t6s)(e?-20:20,2+n);null!=this.carryingItem&&(this.carryingItem.graphics.flipHorizontal=e,this.carryingItem.offset="hand"==t?o:r)}onInitialize(t){this.pos=s.t6s(this.pos.x,t.drawHeight-this.height/2)}onPostUpdate(t,e){null!==this.runningTarget?(this.runningDirection=Math.sign(this.runningTarget-this.pos.x),Math.abs(this.runningTarget-this.pos.x)<q.PICK_UP_THRESHOLD&&(this.runningTarget=null,this.assignedItem&&(this.satisfied=!0,this.pickUpItem(this.assignedItem),this.goTo(1e4)))):this.satisfied||(this.runningDirection=null),this.satisfied&&this.pos.x>t.drawWidth+this.width&&(console.log("Killing customer"),this.kill()),null!==this.runningDirection?this.acc.x=q.ACCELERATION*this.runningDirection:(this.acc.x=0,this.vel.x*=.75),-1==this.runningDirection?(this.graphics.flipHorizontal=!0,this.graphics.use(this.animations.run),this.updateItemPosition("back")):1==this.runningDirection?(this.graphics.flipHorizontal=!1,this.graphics.use(this.animations.run),this.updateItemPosition("back")):(this.graphics.use(this.animations.idle),this.updateItemPosition("hand")),this.vel.x=(0,s.qE8)(this.vel.x,-q.MAX_VELOCITY,q.MAX_VELOCITY),this.updateBubblePosition()}goFetchItem(t){this.runningTarget=t.pos.x,this.assignedItem=t,t.allocatedToCustomer=!0}goTo(t){this.runningTarget=t}productAssigned(){return null!=this.assignedItem}}q.MAX_VELOCITY=300,q.ACCELERATION=700,q.PICK_UP_THRESHOLD=25;class tt extends s.Agj{constructor(t,e,i,n,o,r=80){super({pos:(0,s.t6s)(e,i),height:r,width:n,color:s.Q1f.Transparent,collisionType:s.Bpo.Passive}),this.customers=[],this.pendingProducts=[],this.mainScene=t,this.desiredItems=o}sampleItem(){const t=[];this.desiredItems.reduce(((e,i,s)=>(t[s]=e+i.distribution,t[s])),0);const e=Math.random()*t[t.length-1];return this.desiredItems[t.findIndex((t=>e<t))]}onInitialize(t){this.scheduleCustomersRefresh(t)}scheduleCustomersRefresh(t){const e=Math.random()*(tt.MAX_TIMEOUT-tt.MIN_TIMEOUT)+tt.MIN_TIMEOUT,i=this.mainScene;null!==i&&setTimeout((()=>{this.customers=this.customers.filter((t=>!t.isKilled()));let e=this.customers.filter((t=>!t.productAssigned()));if(e.length<tt.MAX_WAITING_CUSTOMERS){console.log("Adding customer.");const t=this.sampleItem(),s=this.width+tt.CUSTOMER_OFFSET,n=new q(s,t);Math.random()<.5?A.Load.Chirp1Sound.play(.5):A.Load.Chirp2Sound.play(.5),this.customers.push(n),e=this.customers.filter((t=>!t.productAssigned()));for(let t=0;t<e.length;t++)e[t].goTo(this.width-tt.CUSTOMER_OFFSET*(e.length-t));i.add(n),this.pendingProducts.length>0&&n.goFetchItem(this.pendingProducts.pop())}this.scheduleCustomersRefresh(t)}),e)}onCollisionStart(t,e,i,s){const o=e.owner;if(!(o instanceof n))return;if(o.allocatedToCustomer)return;let r=o.item;const h=this.customers.find((t=>!t.satisfied&&!t.productAssigned()&&Object.getPrototypeOf(t.desiredItem)==Object.getPrototypeOf(r)));h?h.goFetchItem(o):(this.pendingProducts.push(o),console.log(o),setTimeout((()=>{this.pendingProducts.includes(o)&&!o.allocatedToCustomer&&(this.pendingProducts=this.pendingProducts.filter((t=>t!==o)),o.actions.fade(0,1e3).callMethod((()=>{})))}),tt.ITEM_TIMEOUT))}}tt.HEIGHT=100,tt.MIN_TIMEOUT=1e3,tt.MAX_TIMEOUT=3e3,tt.MAX_WAITING_CUSTOMERS=2,tt.ITEM_TIMEOUT=5e3,tt.CUSTOMER_OFFSET=40;class et extends s.Agj{constructor(t,e=!1){super({color:s.Q1f.Gray,collisionType:s.Bpo.Fixed,...t}),this.isOn=!0,this.itemQueue=[],this.blacklistedItemQueue=[],this.isProcessing=!1,this.remainingProcessingTime=0,this.maxProcessingTime=1.5,this.manual=e,this.tooltip=new s.JU7({text:"",pos:(0,s.t6s)(0,5),font:new s.KQV({textAlign:s.nOB.Center,baseAlign:s.vhs.Middle,shadow:{blur:5,offset:(0,s.t6s)(0,0),color:s.Q1f.Black},family:"Silkscreen",size:15,unit:s.yRQ.Px,color:s.Q1f.White})}),this.tooltip.z=1e3;let[i,o]=this.getIntake();this.intakeActor=new s.Agj({pos:i.add(o).scale(.5),width:o.x-i.x,height:o.y-i.y,collisionType:s.Bpo.Fixed,color:s.Q1f.Transparent}),this.intakeActor.on("collisionstart",(t=>{if(this.isOn&&t.other instanceof n){const e=t.other;this.itemQueue.includes(e)||this.blacklistedItemQueue.includes(e)||this.itemQueue.push(e)}})),this.addChild(this.intakeActor),this.addChild(this.tooltip)}onPostUpdate(t,e){var i;if(this.isProcessing)if(this.remainingProcessingTime<=0){const t=this.itemQueue.shift();t.kill(),this.isProcessing=!1,this.remainingProcessingTime=0,this.tooltip.text="";const e=this.processItem(t.item);if(e){const t=new n(e);t.pos=this.getOutlet().add(this.pos),this.blacklistedItemQueue.push(t),null===(i=this.scene)||void 0===i||i.add(t)}}else this.manual||(this.remainingProcessingTime=Math.max(this.remainingProcessingTime-e/1e3,0)),this.tooltip.text=`${this.remainingProcessingTime.toFixed(1)}`;else 0!=this.itemQueue.length&&(this.isProcessing=!0,this.remainingProcessingTime=this.maxProcessingTime,this.tooltip.text=`${this.remainingProcessingTime.toFixed(1)}`)}}class it extends et{getSprite(){const t=A.Machines().getSprite(2,0);return t.scale=(0,s.t6s)(.22,.22),t}constructor(t,e){super({pos:(0,s.t6s)(t,e),z:1}),this.graphics.use(A.Machines().getSprite(2,0)),this.collider.set(new s.ElT([s.ypk.Box(45,16,void 0,(0,s.t6s)(0,-6)),s.ypk.Polygon([(0,s.t6s)(10,1),(0,s.t6s)(14,21),(0,s.t6s)(15,21),(0,s.t6s)(11,0)],(0,s.t6s)(-24,-35)),s.ypk.Polygon([(0,s.t6s)(43,1),(0,s.t6s)(42,0),(0,s.t6s)(39,21),(0,s.t6s)(40,21)],(0,s.t6s)(-24,-35))]))}processItem(t){return t.brew?t.brew():null}getIntake(){return[(0,s.t6s)(-8,-16),(0,s.t6s)(8,-4)]}getOutlet(){return(0,s.t6s)(0,10)}}class st extends s.Agj{constructor(t,e,i=0){super({pos:t,rotation:i/180*Math.PI,width:e.x,height:e.y,collisionType:s.Bpo.Fixed})}}class nt extends et{getSprite(){const t=A.Machines().getSprite(0,0);return t.scale=(0,s.t6s)(.22,.22),t}constructor(t,e){super({pos:(0,s.t6s)(t,e),z:1},!0),this.grindedLastTick=!0,this.graphics.add(A.Machines().getSprite(0,0)),this.collider.set(new s.VQc({radius:16,offset:(0,s.t6s)(0,6)})),this.crank=new s.Agj({pos:(0,s.t6s)(.5,5),z:this.z+1});const i=A.Machines().getSprite(1,0);this.crank.graphics.add(i),this.addChild(this.crank),this.addChild(new st((0,s.t6s)(-11,-18),(0,s.t6s)(27,2),75)),this.addChild(new st((0,s.t6s)(12,-18),(0,s.t6s)(27,2),-75))}onPostUpdate(t,e){super.onPostUpdate(t,e);let i=!1;if(this.isOn){let t=this.crank.rotation;this.crank.rotation=-this.remainingProcessingTime/this.maxProcessingTime*Math.PI*2,t!=this.crank.rotation?i=!0:this.grindedLastTick=!1}i?this.grindedLastTick||(A.Load.GrinderSound.seek(this.maxProcessingTime-this.remainingProcessingTime),A.Load.GrinderSound.play(.5)):A.Load.GrinderSound.stop(),this.grindedLastTick=i}processItem(t){return t.grind?t.grind():null}getIntake(){return[(0,s.t6s)(-5,-10),(0,s.t6s)(5,-5)]}getOutlet(){return(0,s.t6s)(.5,10)}}class ot extends s.Agj{constructor(t,e,i,o){super({x:t,y:e,width:i,height:i,color:s.Q1f.Gray,collisionType:s.Bpo.Passive}),this.cooldownTimer=0,this.isOnCooldown=!1,this.COOLDOWN=3,this.item=o,this.tooltip=new s.JU7({text:"Space",pos:(0,s.t6s)(0,-i/2-6),font:new s.KQV({textAlign:s.nOB.Center,baseAlign:s.vhs.Bottom,shadow:{blur:5,offset:(0,s.t6s)(0,0),color:s.Q1f.Black},family:"Silkscreen",size:15,unit:s.yRQ.Px,color:s.Q1f.White})}),this.tooltip.scale=(0,s.t6s)(0,0);let r=new n(o);r.body.collisionType=s.Bpo.PreventCollision,this.addChild(this.tooltip),this.addChild(r),r.scale=(0,s.t6s)(.8,.8),this.graphics.use(A.Load.ResourceStation.toSprite())}onPostUpdate(t,e){const i=t.input.keyboard.wasPressed(s.D$R.Space);this.isOnCooldown?(this.cooldownTimer-=e/1e3,this.cooldownTimer<=0?(this.isOnCooldown=!1,this.tooltip.text="Space"):(this.tooltip.text=`${this.cooldownTimer.toFixed(1)}`,this.tooltip.graphics.opacity=.5)):this.playerReference&&(this.playerReference.isCarryingItem()?this.tooltip.graphics.opacity=.5:this.tooltip.graphics.opacity=1,!i||this.playerReference.isCarryingItem()||this.isOnCooldown||(this.playerReference.pickUpItem(new n(this.item)),this.isOnCooldown=!0,this.cooldownTimer=this.COOLDOWN,this.tooltip.text=`${this.COOLDOWN.toFixed(1)}`,this.actions.delay(1e3*this.COOLDOWN).callMethod((()=>{null==this.playerReference&&this.tooltip.actions.scaleTo((0,s.t6s)(0,0),(0,s.t6s)(10,20)).callMethod((()=>{this.tooltip.text="Space"}))}))))}onCollisionStart(t,e,i,n){const o=e.owner.get(s.Yfw);o.owner instanceof V&&(this.playerReference=o.owner,this.tooltip.actions.scaleTo((0,s.t6s)(1,1),(0,s.t6s)(10,20)))}onCollisionEnd(t,e,i,n){e.owner.get(s.Yfw).owner instanceof V&&(this.playerReference=void 0,this.isOnCooldown||this.tooltip.actions.scaleTo((0,s.t6s)(0,0),(0,s.t6s)(10,20)))}}const rt=ot;const ht=[new class{constructor(){this.timeLimitMs=3e5,this.maxPoints=100,this.size=Object.freeze((0,s.t6s)(400,400)),this.getDesiredItems=()=>[{item:new W,distribution:.6,price:10},{item:new G,distribution:.4,price:15}]}getNewRecipes(){return[new F(new M,new nt(0,0),new D),new F(new D,new it(0,0),new G)]}spawnItems(t){let{x:e,y:i}=this.size;[new J(e/2,200,e,20),new J(e/2,i,e,20,0,s.Bpo.Fixed),new X(210,150,60,10),new X(320,150,60,10),new X(this.size.x/2+5,310,30,10,-Math.PI/5,s.Bpo.Fixed)].forEach((e=>t.add(e))),[new rt(210,130,30,new M),new rt(320,130,30,new k)].forEach((e=>t.add(e)));const n=new V(this.size.x/2,180);t.add(n);const o=new nt(this.size.x/2,260);t.add(o);const r=new it(this.size.x/2-30,360);t.add(r);const h=new Z(90,110,50,o);t.add(h);const a=new tt(t,this.size.x/2,this.size.y,this.size.x,this.getDesiredItems());t.add(a)}}];class at extends s.N$8{constructor(){super({displayMode:s.q5Z.FillScreen,antialiasing:!1}),this.curLevelId=0,this.isShowDebug=!1,this.debug.collider.boundsColor=s.Q1f.Red,this.debug.collider.showAll=!0}start(){this.debug.collider.showBounds=!0;const t=new s.aHM(Object.values(A.Load));return super.start(t)}restart(){this.goToScene("idle").then((()=>{this.removeScene(this.mainScene),this.showCurrentLevel()}))}onStart(){this.addScene("start",new Y(this)),this.goToScene("start")}showLevelIntro(){this.addScene("intro",new j(this,ht[this.curLevelId],this.curLevelId)),this.goToScene("intro")}showLevelOutro(t){this.addScene("outro",new $(this,this.curLevelId,t)),this.goToScene("outro")}showNextLevel(){this.curLevelId++,this.curLevelId>=ht.length?this.restart():this.showCurrentLevel()}showCurrentLevel(){this.addScene("main",new N(this,ht[this.curLevelId])),this.goToScene("main")}showPause(){this.addScene("pause",new j(this,ht[this.curLevelId],this.curLevelId,!0)),this.goToScene("pause")}exitPause(){this.goToScene("main")}onPreUpdate(t,e){t.input.keyboard.wasPressed(s.D$R.R)&&this.restart(),t.input.keyboard.wasPressed(s.D$R.F4)&&(this.isShowDebug=!this.isShowDebug,this.showDebug(this.isShowDebug))}}const lt=new at;lt.start().then((()=>{lt.onStart()}))},601:(t,e,i)=>{t.exports=i.p+"54c91bc04ccbf4034fdd.mp3"},30:(t,e,i)=>{t.exports=i.p+"6c709135a0cf7ae56322.mp3"},987:(t,e,i)=>{t.exports=i.p+"f7c4e170987a017d2460.mp3"},735:(t,e,i)=>{t.exports=i.p+"9469fff652985ec3dd33.mp3"},820:(t,e,i)=>{t.exports=i.p+"e8132081b42833ec6be4.mp3"},315:(t,e,i)=>{t.exports=i.p+"3042316294626ee55c95.mp3"},945:(t,e,i)=>{t.exports=i.p+"a4de085ac226e8b11d95.mp3"}},i={};function s(t){var n=i[t];if(void 0!==n)return n.exports;var o=i[t]={exports:{}};return e[t](o,o.exports,s),o.exports}s.m=e,t=[],s.O=(e,i,n,o)=>{if(!i){var r=1/0;for(d=0;d<t.length;d++){for(var[i,n,o]=t[d],h=!0,a=0;a<i.length;a++)(!1&o||r>=o)&&Object.keys(s.O).every((t=>s.O[t](i[a])))?i.splice(a--,1):(h=!1,o<r&&(r=o));if(h){t.splice(d--,1);var l=n();void 0!==l&&(e=l)}}return e}o=o||0;for(var d=t.length;d>0&&t[d-1][2]>o;d--)t[d]=t[d-1];t[d]=[i,n,o]},s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t;s.g.importScripts&&(t=s.g.location+"");var e=s.g.document;if(!t&&e&&(e.currentScript&&"SCRIPT"===e.currentScript.tagName.toUpperCase()&&(t=e.currentScript.src),!t)){var i=e.getElementsByTagName("script");if(i.length)for(var n=i.length-1;n>-1&&(!t||!/^http(s?):/.test(t));)t=i[n--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=t})(),(()=>{var t={792:0};s.O.j=e=>0===t[e];var e=(e,i)=>{var n,o,[r,h,a]=i,l=0;if(r.some((e=>0!==t[e]))){for(n in h)s.o(h,n)&&(s.m[n]=h[n]);if(a)var d=a(s)}for(e&&e(i);l<r.length;l++)o=r[l],s.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return s.O(d)},i=self.webpackChunkexcalibur_webpack=self.webpackChunkexcalibur_webpack||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))})();var n=s.O(void 0,[128],(()=>s(957)));n=s.O(n)})();
//# sourceMappingURL=main.js.map