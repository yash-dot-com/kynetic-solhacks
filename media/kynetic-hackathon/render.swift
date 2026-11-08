import AppKit
import CoreText

// Native vector renderer. No app packages or website source are changed.
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let out = root.appendingPathComponent("media/kynetic-hackathon")
let assets = root.appendingPathComponent(".context/refs/kynetic-film/assets")
CTFontManagerRegisterFontsForURL(assets.appendingPathComponent("Inter.ttf") as CFURL, .process, nil)
let W = 1280.0, H = 720.0, scale = 1.5
let white = NSColor(calibratedRed: 0.96, green: 0.97, blue: 1, alpha: 1)
let muted = NSColor(calibratedRed: 0.66, green: 0.72, blue: 0.83, alpha: 1)
let ink = NSColor(calibratedRed: 0.035, green: 0.05, blue: 0.10, alpha: 1)
let blue = NSColor(calibratedRed: 0.255, green: 0.412, blue: 0.882, alpha: 1)
let pale = NSColor(calibratedRed: 0.70, green: 0.79, blue: 1, alpha: 1)
let green = NSColor(calibratedRed: 0.078, green: 0.945, blue: 0.584, alpha: 1)
let panel = NSColor(calibratedRed: 0.075, green: 0.105, blue: 0.18, alpha: 1)
let edge = NSColor(calibratedRed: 0.17, green: 0.23, blue: 0.36, alpha: 1)
let solana = NSImage(contentsOf: assets.appendingPathComponent("solana-mark.png"))!

func ease(_ x: Double) -> Double { let v = min(1,max(0,x)); return 1-pow(1-v,3) }
func rect(_ x:Double,_ y:Double,_ w:Double,_ h:Double,_ color:NSColor,_ r:Double=0) {
  color.setFill(); NSBezierPath(roundedRect:NSRect(x:x,y:y,width:w,height:h),xRadius:r,yRadius:r).fill()
}
func line(_ pts:[CGPoint],_ color:NSColor,_ width:Double=2) {
  guard let first=pts.first else{return};let p=NSBezierPath();p.move(to:first);for v in pts.dropFirst(){p.line(to:v)};p.lineWidth=width;color.setStroke();p.stroke()
}
func poly(_ pts:[CGPoint],_ color:NSColor) {
  let p=NSBezierPath();p.move(to:pts[0]);for v in pts.dropFirst(){p.line(to:v)};p.close();color.setFill();p.fill();ink.setStroke();p.lineWidth=2;p.stroke()
}
func text(_ value:String,_ x:Double,_ y:Double,_ size:Double,_ color:NSColor=white,_ bold:Bool=false,_ center:Bool=false) {
  let font = NSFont(name:bold ? "Inter-Bold" : "Inter-Regular",size:size) ?? NSFont.systemFont(ofSize:size,weight:bold ? .bold:.regular)
  let attrs:[NSAttributedString.Key:Any] = [.font:font,.foregroundColor:color,.kern: bold ? -size*0.035:0]
  let s=value as NSString;let width=s.size(withAttributes:attrs).width
  s.draw(at:NSPoint(x:center ? x-width/2:x,y:y),withAttributes:attrs)
}
func wordmark(_ x:Double,_ y:Double,_ size:Double=32,_ center:Bool=false) {
  text("Kynetic",x,y,size,white,true,center)
}
func image(_ im:NSImage,_ x:Double,_ y:Double,_ w:Double,_ h:Double) {
  im.draw(in:NSRect(x:x,y:y,width:w,height:h),from:.zero,operation:.sourceOver,fraction:1,respectFlipped:true,hints:nil)
}
func cube(_ x:Double,_ y:Double,_ s:Double,_ h:Double,_ top:NSColor=blue) {
  let a=CGPoint(x:x,y:y-h),b=CGPoint(x:x+s,y:y-h+s*0.5),c=CGPoint(x:x,y:y-h+s),d=CGPoint(x:x-s,y:y-h+s*0.5)
  poly([d,c,CGPoint(x:x,y:y+s),CGPoint(x:x-s,y:y+s*0.5)],top.blended(withFraction:0.36,of:ink)!)
  poly([b,c,CGPoint(x:x,y:y+s),CGPoint(x:x+s,y:y+s*0.5)],top.blended(withFraction:0.15,of:ink)!)
  poly([a,b,c,d],top)
}
func arrow(_ x:Double,_ y:Double,_ len:Double,_ color:NSColor=blue) {
  line([CGPoint(x:x,y:y),CGPoint(x:x+len,y:y)],color,3)
  line([CGPoint(x:x+len-9,y:y-7),CGPoint(x:x+len,y:y),CGPoint(x:x+len-9,y:y+7)],color,3)
}
func label(_ s:String,_ x:Double,_ y:Double,_ color:NSColor=muted) { text(s,x,y,17,color,false,true) }
func header(_ index:Int) {
  wordmark(56,28,29);text("MODEL IMPROVEMENT, MEASURED.",890,36,16,muted)
  for i in 0..<6 {rect(56+Double(i)*197,674,181,3,i<=index ? blue:edge,1)}
}
func title(_ eyebrow:String,_ main:String,_ sub:String,_ enter:Double=0) {
  let dy=24*(1-ease(enter/0.55));text(eyebrow,640,102+dy,16,pale,true,true)
  text(main,640,137+dy,48,white,true,true);text(sub,640,204+dy,22,muted,false,true)
}
func pill(_ s:String,_ x:Double,_ y:Double,_ w:Double,_ color:NSColor=panel) {
  rect(x,y,w,37,color,18);text(s,x+w/2,y+8,17,white,false,true)
}
func base(_ index:Int) {
  rect(0,0,W,H,ink)
  let grad=NSGradient(starting:blue.withAlphaComponent(0.19),ending:ink)!
  grad.draw(in:NSBezierPath(rect:NSRect(x:0,y:0,width:W,height:H)),angle:68)
  // Quiet dot grid gives the object scenes a physical ground.
  for x in stride(from:56.0,through:1224.0,by:36){for y in stride(from:284.0,through:640.0,by:36){rect(x,y,1,1,edge)}}
  header(index)
}
func shot(_ t:Double) {
 if t<3 {
  base(0);let p=ease(t/0.7);wordmark(640,138+22*(1-p),88,true)
  text("Pay for model improvement.",640,263,47,white,true,true)
  text("Not just more data.",640,328,47,pale,true,true)
  pill("A performance-based AI data marketplace",422,437,436)
  label("Robotics · task-specific models · LLMs · vision",640,505)
 } else if t<6.3 {
  let u=t-3;base(1);title("01 / FUND A CHALLENGE","One weakness. One funded goal.","An organization defines the model, metric, and bounty.",u)
  rect(110,292,450,284,panel,16);text("EXAMPLE CHALLENGE",139,317,16,pale,true)
  text("Detect reflective objects",139,355,29,white,true)
  text("Targeted images. Published benchmark.",139,406,20,muted)
  pill("12 SOL bounty",138,477,178,blue);pill("0.1 SOL entry stake",331,477,202)
  arrow(594,436,100)
  let h=50*ease(u/0.8);cube(920,446,102,h,blue)
  image(solana,890,307,60,60);label("FUNDED ESCROW",920,557,pale)
 } else if t<10 {
  let u=t-6.3;base(2);title("02 / STAKE + CONTRIBUTE","Bring data for that exact problem.","Contributors stake SOL and submit targeted datasets.",u)
  for i in 0..<4 {
   let d=Double(i);let p=ease((u-d*0.15)/0.75);let x=205+d*92+p*105;let y=418+d*14
   cube(x,y,36,12,pale)
  }
  arrow(662,455,100)
  cube(960,415,90,66,blue);rect(918,340,84,48,ink,5)
  text("AI",960,345,30,white,true,true);label("FINE-TUNE MODEL",960,562,pale)
  pill("Images",190,556,105);pill("Text",307,556,85);pill("Task examples",404,556,162)
 } else if t<14 {
  let u=t-10;base(3);title("03 / EVALUATE + ATTRIBUTE","Measure what the data changed.","The host evaluates impact using the challenge’s published rules.",u)
  let rise=ease((u-0.4)/1.3)
  cube(458,488,69,75,pale);cube(812,488,69,75+115*rise,blue)
  text("61%",458,330,46,white,true,true);text("79%",812,248+115*(1-rise),46,green,true,true)
  label("BASELINE",458,582);label("AFTER FINE-TUNING",812,582)
  arrow(582,463,110);pill("+18 percentage points",511,518,259)
  text("ILLUSTRATIVE BENCHMARK",640,626,16,muted,false,true)
 } else if t<18 {
  let u=t-14;base(4);title("04 / SETTLE ON SOLANA","AI measures. Solana settles.","Escrowed funds. Contributor rewards. Entry stakes returned.",u)
  image(solana,592,277,96,96)
  rect(479,398,322,66,panel,12);text("Published evaluation result",640,419,21,white,false,true)
  for i in 0..<3 {
   let x=320+Double(i)*320;let p=ease((u-0.45-Double(i)*0.13)/0.8)
   line([CGPoint(x:640,y:464),CGPoint(x:640,y:485),CGPoint(x:x,y:485),CGPoint(x:x,y:511)],edge,2)
   cube(x,550-30*(1-p),29,10,i==0 ? blue:pale)
  }
  label("BOUNTY HELD",320,603);label("REWARDS SPLIT",640,603);label("STAKES RETURNED",960,603)
 } else {
  let u=t-18;base(5);let p=ease(u/0.6);wordmark(640,163+18*(1-p),91,true)
  text("Better data. Measurable impact.",640,306,45,white,true,true)
  text("Explore challenges. Contribute. Earn.",640,378,25,muted,false,true)
  image(solana,520,477,44,44);text("Built on Solana",581,483,26,white,true)
  text("SOLANA HACKATHON / PRODUCT CONCEPT",640,577,16,muted,false,true)
 }
}

try FileManager.default.createDirectory(at:out.appendingPathComponent("frames"),withIntermediateDirectories:true)
let fps=24
for frame in 0..<(20*fps) {
 autoreleasepool {
  let rep=NSBitmapImageRep(bitmapDataPlanes:nil,pixelsWide:1920,pixelsHigh:1080,bitsPerSample:8,samplesPerPixel:4,hasAlpha:true,isPlanar:false,colorSpaceName:.deviceRGB,bytesPerRow:0,bitsPerPixel:0)!
  NSGraphicsContext.saveGraphicsState();let ctx=NSGraphicsContext(bitmapImageRep:rep)!;NSGraphicsContext.current=ctx
  ctx.cgContext.translateBy(x:0,y:1080);ctx.cgContext.scaleBy(x:scale,y:-scale)
  NSGraphicsContext.current=NSGraphicsContext(cgContext:ctx.cgContext,flipped:true)
  shot(Double(frame)/Double(fps))
  NSGraphicsContext.restoreGraphicsState()
  let data=rep.representation(using:.png,properties:[:])!
  try! data.write(to:out.appendingPathComponent(String(format:"frames/%04d.png",frame)))
 }
 if frame % 96 == 0 {print("Rendered \(frame)/480 frames")}
}
print("Rendered 20 seconds at 1920×1080, 24 fps")
