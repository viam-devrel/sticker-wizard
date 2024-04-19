<script lang="ts">
	import { T } from '@threlte/core';
	import { AnimatedSpriteMaterial } from '@threlte/extras';
	import bucketImg from '$lib/assets/bucket.png';
	import bucketJSON from '$lib/assets/bucket.json?url';
</script>

<T.Sprite scale={[7, 11, 7]} position.y={0.5} position.x={-8}>
	<AnimatedSpriteMaterial textureUrl={bucketImg} dataUrl={bucketJSON} />
	<T.PlaneGeometry />
</T.Sprite>
